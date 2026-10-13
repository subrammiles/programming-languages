/**
 * Queueable Apex: async jobs that can hold state (any member variables),
 * return a job Id you can monitor, and chain to another job.
 *   Id jobId = System.enqueueJob(new PriceUpdateJob(...));
 * A Finalizer runs after the job, even if it failed: good for logging and retries.
 */
public with sharing class PriceUpdateJob implements Queueable {
    private final Decimal percentIncrease;

    public PriceUpdateJob(Decimal percentIncrease) {
        this.percentIncrease = percentIncrease;
    }

    public void execute(QueueableContext context) {
        System.attachFinalizer(new JobFinalizer());
        List<Course__c> courses = [SELECT Price__c FROM Course__c WHERE Price__c != null WITH USER_MODE LIMIT 10000];
        for (Course__c c : courses) {
            c.Price__c = (c.Price__c * (100 + percentIncrease) / 100).setScale(2);
        }
        update as user courses;
    }

    public class JobFinalizer implements Finalizer {
        public void execute(FinalizerContext context) {
            System.debug('job ' + context.getAsyncApexJobId() + ' finished with ' + context.getResult());
        }
    }
}
