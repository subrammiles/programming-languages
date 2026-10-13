/**
 * Async code runs when Test.stopTest() is called, so assertions after stopTest see the results.
 */
@IsTest
private class AsyncApexTest {
    @TestSetup
    static void createCourses() {
        insert new List<Course__c>{
            new Course__c(Name = 'Apex', Price__c = 100),
            new Course__c(Name = 'SOQL', Price__c = 200, Course_Completed__c = true)
        };
    }

    @IsTest
    static void futureMethod() {
        Map<Id, Course__c> courses = new Map<Id, Course__c>([SELECT Id FROM Course__c]);
        Test.startTest();
        FutureExamples.markCoursesCompleted(courses.keySet());
        Test.stopTest(); // the future method runs here
        Assert.areEqual(2, [SELECT COUNT() FROM Course__c WHERE Course_Completed__c = true]);
    }

    @IsTest
    static void queueableJob() {
        Test.startTest();
        Id jobId = System.enqueueJob(new PriceUpdateJob(10));
        Test.stopTest();
        Assert.isNotNull(jobId);
        Assert.areEqual(110, [SELECT Price__c FROM Course__c WHERE Name = 'Apex'].Price__c);
    }

    @IsTest
    static void batchJob() {
        Test.startTest();
        Database.executeBatch(new CourseCleanupBatch());
        Test.stopTest();
        Assert.areEqual(1, [SELECT COUNT() FROM Course__c WHERE Name = '[Done] SOQL']);
    }

    @IsTest
    static void scheduledJob() {
        Test.startTest();
        Id jobId = System.schedule('Test cleanup', NightlyCleanupScheduler.EVERY_NIGHT_AT_2AM, new NightlyCleanupScheduler());
        Test.stopTest();
        CronTrigger ct = [SELECT CronExpression, TimesTriggered FROM CronTrigger WHERE Id = :jobId];
        Assert.areEqual(NightlyCleanupScheduler.EVERY_NIGHT_AT_2AM, ct.CronExpression);
    }
}
