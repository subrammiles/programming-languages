/**
 * Schedulable Apex runs on a schedule (a cron expression):
 *   seconds minutes hours day-of-month month day-of-week [year]
 *   System.schedule('Nightly cleanup', '0 0 2 * * ?', new NightlyCleanupScheduler());  // 2 AM daily
 * Keep execute() small: usually it just starts a batch or queueable job.
 */
public with sharing class NightlyCleanupScheduler implements Schedulable {
    public static final String EVERY_NIGHT_AT_2AM = '0 0 2 * * ?';

    public void execute(SchedulableContext context) {
        Database.executeBatch(new CourseCleanupBatch(), 200);
    }
}
