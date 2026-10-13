/**
 * A test data factory: one place that builds valid records for every test.
 * When a new required field or validation rule appears, you fix it here once.
 * @IsTest classes don't count toward your org's code size and can't be called by normal code.
 */
@IsTest
public class TestDataFactory {
    public static List<Course__c> courses(Integer count, Boolean doInsert) {
        List<Course__c> result = new List<Course__c>();
        for (Integer i = 0; i < count; i++) {
            result.add(new Course__c(Name = 'Test Course ' + i, Price__c = 100 + i));
        }
        if (doInsert) {
            insert result;
        }
        return result;
    }

    public static User standardUser() {
        Profile p = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];
        String unique = String.valueOf(Crypto.getRandomInteger()).replace('-', '');
        return new User(
            Alias = 'tuser',
            Email = 'test' + unique + '@example.com',
            Username = 'test' + unique + '@apex-tutorial.example.com',
            LastName = 'Tester',
            ProfileId = p.Id,
            TimeZoneSidKey = 'Asia/Kolkata',
            LocaleSidKey = 'en_IN',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
    }
}
