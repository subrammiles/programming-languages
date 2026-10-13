/**
 * Two separate questions decide what Apex may do with data:
 *  1. SHARING (record level): which RECORDS can the user see?
 *       with sharing       respect the user's record access   (the safe default)
 *       without sharing    see all records (system context)   (only when you really need it)
 *       inherited sharing  follow the calling class
 *  2. OBJECT and FIELD permissions (CRUD/FLS): can the user read/edit this object and field?
 *       Apex runs in SYSTEM mode by default and ignores them, so ENFORCE them:
 *       - SOQL ... WITH USER_MODE,  insert as user ...,  Database methods with AccessLevel.USER_MODE
 *       - Security.stripInaccessible() removes fields the user can't see
 *       - Schema describe checks: isAccessible(), isCreateable(), isUpdateable()
 * Also: never build SOQL by concatenating user input (use bind variables); escape output in pages.
 */
public with sharing class SharingExamples {
    public static List<Course__c> visibleCourses() {
        // with sharing + WITH USER_MODE: only records AND fields this user may see
        return [SELECT Name, Price__c FROM Course__c WITH USER_MODE ORDER BY Name LIMIT 200];
    }

    public static List<Course__c> stripInaccessibleFields(List<Course__c> records) {
        SObjectAccessDecision decision = Security.stripInaccessible(AccessType.READABLE, records);
        System.debug('removed fields: ' + decision.getRemovedFields());
        return (List<Course__c>) decision.getRecords();
    }

    public static Boolean canEditPrice() {
        return Schema.SObjectType.Course__c.fields.Price__c.isUpdateable();
    }

    public static List<Course__c> searchSafely(String userInput) {
        String pattern = '%' + userInput + '%'; // bound as a VALUE, so input can't change the query
        return [SELECT Name FROM Course__c WHERE Name LIKE :pattern WITH USER_MODE LIMIT 50];
    }

    /** Runs without sharing: used only for a count that every user may know. */
    public without sharing class SystemContext {
        public Integer totalCourses() {
            return [SELECT COUNT() FROM Course__c WITH SYSTEM_MODE]; // NOPMD - deliberately counts all records
        }
    }
}
