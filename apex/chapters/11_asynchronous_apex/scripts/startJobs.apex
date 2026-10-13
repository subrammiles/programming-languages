// Starts real async jobs in your org. Watch them in Setup > Apex Jobs.
// Run: sf apex run --file chapters/11_asynchronous_apex/scripts/startJobs.apex
Id queueableId = System.enqueueJob(new PriceUpdateJob(5));
Id batchId = Database.executeBatch(new CourseCleanupBatch(), 200);
System.debug('queueable ' + queueableId + ', batch ' + batchId);

for (AsyncApexJob job : [SELECT JobType, Status, ApexClass.Name FROM AsyncApexJob WITH USER_MODE ORDER BY CreatedDate DESC LIMIT 5]) {
    System.debug(job.ApexClass.Name + ' ' + job.JobType + ' ' + job.Status);
}

// To schedule nightly (remove it later in Setup > Scheduled Jobs):
// System.schedule('Nightly course cleanup', NightlyCleanupScheduler.EVERY_NIGHT_AT_2AM, new NightlyCleanupScheduler());
