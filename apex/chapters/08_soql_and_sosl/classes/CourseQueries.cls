/**
 * SOQL (Salesforce Object Query Language) reads records.
 *  [SELECT fields FROM Object WHERE ... ORDER BY ... LIMIT n]
 *  :variable    a bind variable (safe: no SOQL injection)
 *  WITH USER_MODE   enforce the running user's object and field permissions
 * Always filter (WHERE) or LIMIT: objects can hold millions of rows.
 */
public with sharing class CourseQueries {
    public static List<Course__c> openCourses(Integer maxRows) {
        return [
            SELECT Name, Course_Completed__c, Price__c
            FROM Course__c
            WHERE Course_Completed__c = false
            WITH USER_MODE
            ORDER BY Name
            LIMIT :maxRows
        ];
    }

    public static void printCourses() {
        for (Course__c course : openCourses(50)) {
            System.debug('course: ' + course.Name);
        }
    }

    public static List<Course__c> cheaperThan(Decimal maxPrice) {
        return [SELECT Name, Price__c FROM Course__c WHERE Price__c < :maxPrice WITH USER_MODE ORDER BY Price__c LIMIT 200];
    }

    public static Map<Id, Course__c> byId(Set<Id> ids) {
        // A Map built straight from a query: Id -> record
        return new Map<Id, Course__c>([SELECT Name FROM Course__c WHERE Id IN :ids WITH USER_MODE]);
    }

    public static Integer countCompleted() {
        return [SELECT COUNT() FROM Course__c WHERE Course_Completed__c = true WITH USER_MODE];
    }
}
