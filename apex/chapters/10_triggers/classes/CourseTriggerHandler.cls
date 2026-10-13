/**
 * Trigger handler: keeps logic testable and the trigger itself tiny.
 * Context variables: Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap,
 *                    Trigger.isInsert/isUpdate/isBefore/isAfter, Trigger.operationType
 * Code must be BULK-SAFE: a single save can fire the trigger with 200 records.
 */
public with sharing class CourseTriggerHandler {
    @TestVisible
    private static Integer afterRuns = 0;

    public static void handle(List<Course__c> newRecords, Map<Id, Course__c> oldMap, System.TriggerOperation operation) {
        switch on operation {
            when BEFORE_INSERT {
                normaliseNames(newRecords);
                validatePrices(newRecords);
            }
            when BEFORE_UPDATE {
                validatePrices(newRecords);
                preventUncompleting(newRecords, oldMap);
            }
            when AFTER_INSERT, AFTER_UPDATE {
                afterRuns++;
            }
            when else {
                return;
            }
        }
    }

    private static void normaliseNames(List<Course__c> courses) {
        for (Course__c c : courses) {
            c.Name = c.Name?.trim(); // before trigger: just change the field, no DML
        }
    }

    private static void validatePrices(List<Course__c> courses) {
        for (Course__c c : courses) {
            if (c.Price__c != null && c.Price__c < 0) {
                c.Price__c.addError('Price cannot be negative'); // blocks the save, shows on the field
            }
        }
    }

    private static void preventUncompleting(List<Course__c> courses, Map<Id, Course__c> oldMap) {
        for (Course__c c : courses) {
            Course__c before = oldMap.get(c.Id);
            if (before.Course_Completed__c && !c.Course_Completed__c) {
                c.addError('A completed course cannot be reopened');
            }
        }
    }
}
