/**
 * Separation of concerns, the layers used in larger Salesforce codebases:
 *  Selector  - every SOQL query for one object lives here (this class)
 *  Service   - business logic (CourseService, chapter 07)
 *  Domain / trigger handler - logic tied to record changes (CourseTriggerHandler, chapter 10)
 * Benefits: queries aren't duplicated, field lists stay consistent, and tests can fake one layer.
 * The open-source "fflib" Apex Enterprise Patterns library formalises this.
 */
public with sharing class CourseSelector {
    private static final List<String> FIELDS = new List<String>{ 'Id', 'Name', 'Price__c', 'Course_Completed__c' };

    public List<Course__c> selectById(Set<Id> ids) {
        return Database.queryWithBinds(
            'SELECT ' + String.join(FIELDS, ', ') + ' FROM Course__c WHERE Id IN :ids',
            new Map<String, Object>{ 'ids' => ids },
            AccessLevel.USER_MODE
        );
    }

    public List<Course__c> selectOpen(Integer maxRows) {
        return Database.queryWithBinds(
            'SELECT ' + String.join(FIELDS, ', ') + ' FROM Course__c WHERE Course_Completed__c = false ORDER BY Name LIMIT :maxRows',
            new Map<String, Object>{ 'maxRows' => maxRows },
            AccessLevel.USER_MODE
        );
    }
}
