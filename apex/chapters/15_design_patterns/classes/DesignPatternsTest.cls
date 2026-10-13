@IsTest
private class DesignPatternsTest {
    @IsTest
    static void singletonIsCreatedOnce() {
        AppSettings first = AppSettings.getInstance();
        AppSettings second = AppSettings.getInstance();
        Assert.isTrue(first === second); // === compares identity: the same object
        Assert.areEqual('INR', second.values.get('currency'));
        Assert.areEqual(1, second.loadCount);
    }

    @IsTest
    static void strategyChosenByName() {
        NotificationService.Channel email = NotificationService.channelFor('NotificationService.EmailChannel');
        NotificationService.Channel sms = NotificationService.channelFor('NotificationService.SmsChannel');
        Assert.areEqual('email to asha: Your course starts today', email.send('asha', 'Your course starts today'));
        Assert.areEqual('sms to asha: Your course starts t', sms.send('asha', 'Your course starts today')); // left(20)
        try {
            NotificationService.channelFor('NoSuchChannel');
            Assert.fail('expected an exception');
        } catch (IllegalArgumentException e) {
            Assert.isTrue(e.getMessage().contains('NoSuchChannel'));
        }
    }

    @IsTest
    static void selectorQueries() {
        insert new List<Course__c>{ new Course__c(Name = 'B'), new Course__c(Name = 'A'), new Course__c(Name = 'C', Course_Completed__c = true) };
        CourseSelector selector = new CourseSelector();
        List<Course__c> open = selector.selectOpen(10);
        Assert.areEqual(2, open.size());
        Assert.areEqual('A', open[0].Name);
        Assert.areEqual(1, selector.selectById(new Set<Id>{ open[0].Id }).size());
    }
}
