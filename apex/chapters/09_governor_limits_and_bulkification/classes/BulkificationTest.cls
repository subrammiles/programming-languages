@IsTest
private class BulkificationTest {
    static List<Contact> makeContacts(Integer count) {
        Account acc = new Account(Name = 'Acme', Industry = 'Energy');
        insert acc;
        List<Contact> contacts = new List<Contact>();
        for (Integer i = 0; i < count; i++) {
            contacts.add(new Contact(LastName = 'C' + i, AccountId = acc.Id));
        }
        insert contacts;
        return contacts;
    }

    @IsTest
    static void bulkVersionUsesOneQueryForTwoHundredRecords() {
        List<Contact> contacts = makeContacts(200);
        Test.startTest(); // fresh set of limits from here
        Bulkification.copyIndustryBulk(contacts);
        Integer queriesUsed = Limits.getQueries();
        Test.stopTest();
        Assert.areEqual(1, queriesUsed);
        Assert.areEqual('Industry: Energy', [SELECT Description FROM Contact LIMIT 1].Description);
    }

    @IsTest
    static void loopVersionUsesOneQueryPerRecord() {
        List<Contact> contacts = makeContacts(20);
        Test.startTest();
        Bulkification.copyIndustryOneByOne(contacts);
        Integer queriesUsed = Limits.getQueries();
        Test.stopTest();
        Assert.areEqual(20, queriesUsed); // 101 records would throw System.LimitException, which can't be caught
    }
}
