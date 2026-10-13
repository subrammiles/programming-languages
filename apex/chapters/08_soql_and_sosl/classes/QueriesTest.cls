@IsTest
private class QueriesTest {
    @TestSetup
    static void createData() {
        // @TestSetup runs once; every test method gets a fresh copy of this data
        insert new List<Course__c>{
            new Course__c(Name = 'Apex', Price__c = 100),
            new Course__c(Name = 'SOQL', Price__c = 50),
            new Course__c(Name = 'Flows', Price__c = 300, Course_Completed__c = true)
        };
        Account acc = new Account(Name = 'Acme', Industry = 'Education');
        insert acc;
        insert new List<Contact>{ new Contact(LastName = 'Rao', AccountId = acc.Id), new Contact(LastName = 'Iyer', AccountId = acc.Id) };
    }

    @IsTest
    static void filtersAndOrdering() {
        List<Course__c> open = CourseQueries.openCourses(10);
        Assert.areEqual(2, open.size());
        Assert.areEqual('Apex', open[0].Name);
        Assert.areEqual('SOQL', CourseQueries.cheaperThan(75)[0].Name);
        Assert.areEqual(1, CourseQueries.countCompleted());
        CourseQueries.printCourses();
    }

    @IsTest
    static void mapFromQuery() {
        Map<Id, Course__c> all = new Map<Id, Course__c>([SELECT Id FROM Course__c]);
        Assert.areEqual(3, CourseQueries.byId(all.keySet()).size());
    }

    @IsTest
    static void relationships() {
        Account acc = [SELECT Id FROM Account WHERE Name = 'Acme'];
        Assert.areEqual('Iyer works at Acme', RelationshipQueries.contactsWithAccount(acc.Id)[0]);
        Assert.areEqual(2, RelationshipQueries.contactCountsByAccount(new Set<Id>{ acc.Id }).get('Acme'));
        Assert.areEqual(1, RelationshipQueries.accountsPerIndustry().get('Education'));
    }

    @IsTest
    static void dynamicSoql() {
        Assert.areEqual(1, RelationshipQueries.dynamicQuery('Course__c', 'Name', 'Apex').size());
        try {
            RelationshipQueries.dynamicQuery('Course__c', 'Nope__c', 'x');
            Assert.fail('expected an exception');
        } catch (IllegalArgumentException e) {
            Assert.isTrue(e.getMessage().contains('Unknown'));
        }
    }

    @IsTest
    static void sosl() {
        // SOSL returns nothing in tests unless you say which Ids the "search" should find
        Course__c apex = [SELECT Id FROM Course__c WHERE Name = 'Apex'];
        Test.setFixedSearchResults(new List<Id>{ apex.Id });
        List<List<SObject>> results = RelationshipQueries.search('Apex');
        Assert.areEqual(1, results[2].size());
    }
}
