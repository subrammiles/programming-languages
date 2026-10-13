/**
 * @future: the simplest async Apex. The method runs later, in its own transaction,
 * with higher limits. Rules: static, returns void, only primitive parameters
 * (or collections of them), can't call another future method.
 * Use callout=true when it makes HTTP callouts.
 * For anything more complex, prefer Queueable (next class).
 */
public with sharing class FutureExamples {
    @future // NOPMD - shown for comparison; prefer Queueable for new code
    public static void markCoursesCompleted(Set<Id> courseIds) {
        List<Course__c> courses = [SELECT Id FROM Course__c WHERE Id IN :courseIds WITH USER_MODE];
        for (Course__c c : courses) {
            c.Course_Completed__c = true;
        }
        update as user courses;
    }
}
