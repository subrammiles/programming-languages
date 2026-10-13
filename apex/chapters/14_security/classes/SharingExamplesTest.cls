@IsTest
private class SharingExamplesTest {
    @TestSetup
    static void setup() {
        insert new List<Course__c>{ new Course__c(Name = 'Apex', Price__c = 10), new Course__c(Name = 'Flows', Price__c = 20) };
    }

    @IsTest
    static void adminSeesEverything() {
        Assert.areEqual(2, SharingExamples.visibleCourses().size());
        Assert.areEqual(2, new SharingExamples.SystemContext().totalCourses());
        Assert.isTrue(SharingExamples.canEditPrice());
    }

    @IsTest
    static void stripKeepsReadableRecords() {
        List<Course__c> stripped = SharingExamples.stripInaccessibleFields([SELECT Name, Price__c FROM Course__c]);
        Assert.areEqual(2, stripped.size());
    }

    @IsTest
    static void bindVariablesBlockInjection() {
        Assert.areEqual(1, SharingExamples.searchSafely('Ape').size());
        Assert.areEqual(0, SharingExamples.searchSafely('\' OR Name != \'').size()); // treated as plain text
    }

    @IsTest
    static void userWithoutAccessToTheObject() {
        // A Standard User has no permission set for the custom object, so USER_MODE queries fail
        User u = TestDataFactory.standardUser();
        insert u;
        System.runAs(u) {
            try {
                SharingExamples.visibleCourses();
                Assert.fail('expected a QueryException');
            } catch (QueryException e) {
                Assert.isTrue(e.getMessage().length() > 0);
            }
        }
    }
}
