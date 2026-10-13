/**
 * Tests run in their own transaction and their data is rolled back afterwards,
 * so they never change the real records in your org.
 */
@IsTest
private class CourseServiceTest {
    @IsTest
    static void insertGivesAnId() {
        Course__c c = CourseService.createCourse('Photography', 4999);
        Assert.isNotNull(c.Id);
    }

    @IsTest
    static void bulkInsertAndUpdate() {
        List<Course__c> courses = CourseService.createCourses(new List<String>{ 'Apex', 'SOQL', 'LWC' });
        Assert.areEqual(3, [SELECT COUNT() FROM Course__c]);

        CourseService.completeCourse(courses[0]);
        Assert.isTrue([SELECT Course_Completed__c FROM Course__c WHERE Id = :courses[0].Id].Course_Completed__c);
    }

    @IsTest
    static void upsertInsertsThenUpdates() {
        CourseService.upsertByName('Flows', 100);
        CourseService.upsertByName('Flows', 150);
        List<Course__c> rows = [SELECT Price__c FROM Course__c WHERE Name = 'Flows'];
        Assert.areEqual(1, rows.size());
        Assert.areEqual(150, rows[0].Price__c);
    }

    @IsTest
    static void deleteAndUndelete() {
        Course__c c = CourseService.createCourse('Temp', 1);
        CourseService.deleteAndRestore(c);
        Assert.areEqual(1, [SELECT COUNT() FROM Course__c WHERE Id = :c.Id]);
    }

    @IsTest
    static void partialSuccess() {
        List<Course__c> courses = new List<Course__c>{
            new Course__c(Name = 'Good'),
            new Course__c(Name = 'x'.repeat(81)) // the Name field allows only 80 characters
        };
        List<String> messages = CourseService.insertPartially(courses);
        Assert.areEqual('saved Good', messages[0]);
        Assert.isTrue(messages[1].startsWith('failed'));
    }

    @IsTest
    static void parentAndChildren() {
        Account acc = RelatedRecords.createAccountWithContacts('Acme', new List<String>{ 'Rao', 'Iyer' });
        Assert.areEqual(2, [SELECT COUNT() FROM Contact WHERE AccountId = :acc.Id]);
        Assert.areEqual('Account: Acme', CourseService.describeGeneric(acc));
    }
}
