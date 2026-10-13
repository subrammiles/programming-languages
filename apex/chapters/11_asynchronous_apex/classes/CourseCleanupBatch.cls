/**
 * Batch Apex processes MILLIONS of records in chunks (default 200 per chunk).
 *  start   -> returns the records to process (a QueryLocator can return up to 50 million)
 *  execute -> called once per chunk, each in its own transaction with fresh limits
 *  finish  -> called once at the end
 * Database.Stateful keeps member variables between chunks.
 *   Database.executeBatch(new CourseCleanupBatch(), 200);
 */
public with sharing class CourseCleanupBatch implements Database.Batchable<SObject>, Database.Stateful {
    public Integer processed = 0;

    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator([SELECT Id, Name FROM Course__c WHERE Course_Completed__c = true WITH USER_MODE]);
    }

    public void execute(Database.BatchableContext context, List<Course__c> scope) {
        for (Course__c c : scope) {
            c.Name = c.Name.startsWith('[Done] ') ? c.Name : '[Done] ' + c.Name;
        }
        update as user scope;
        processed += scope.size();
    }

    public void finish(Database.BatchableContext context) {
        System.debug('Batch finished, records processed: ' + processed);
    }
}
