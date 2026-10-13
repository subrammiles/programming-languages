@IsTest
private class CourseTriggerHandlerTest {
    @IsTest
    static void trimsNamesBeforeInsert() {
        Course__c c = new Course__c(Name = '  Apex Basics  ');
        insert c;
        Assert.areEqual('Apex Basics', [SELECT Name FROM Course__c WHERE Id = :c.Id].Name);
    }

    @IsTest
    static void rejectsNegativePrice() {
        try {
            insert new Course__c(Name = 'Bad', Price__c = -1);
            Assert.fail('expected a DmlException');
        } catch (DmlException e) {
            Assert.isTrue(e.getMessage().contains('Price cannot be negative'));
        }
    }

    @IsTest
    static void cannotReopenCompletedCourse() {
        Course__c c = new Course__c(Name = 'Done', Course_Completed__c = true);
        insert c;
        c.Course_Completed__c = false;
        Database.SaveResult result = Database.update(c, false);
        Assert.isFalse(result.isSuccess());
        Assert.areEqual('A completed course cannot be reopened', result.getErrors()[0].getMessage());
    }

    @IsTest
    static void isBulkSafe() {
        List<Course__c> courses = new List<Course__c>();
        for (Integer i = 0; i < 200; i++) {
            courses.add(new Course__c(Name = ' Course ' + i + ' ', Price__c = i));
        }
        Test.startTest();
        insert courses; // 200 records -> the trigger runs ONCE with all of them
        Test.stopTest();
        Assert.areEqual(200, [SELECT COUNT() FROM Course__c WHERE Name LIKE 'Course %']);
        Assert.areEqual(1, CourseTriggerHandler.afterRuns);
    }
}
