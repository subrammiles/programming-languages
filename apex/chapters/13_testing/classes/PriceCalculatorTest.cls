/**
 * Testing techniques
 *  @TestSetup               shared data, created once and reset for every test
 *  Test.startTest/stopTest  fresh governor limits; runs async code
 *  System.runAs(user)       run as another user to test permissions and sharing
 *  Assert.areEqual / isTrue / isNull / fail / isInstanceOfType  (the Assert class)
 *  Fakes via interfaces, Test.setMock for callouts, the Stub API (System.StubProvider)
 * Aim for meaningful assertions, not just coverage: deploying to production needs 75% coverage.
 */
@IsTest
private class PriceCalculatorTest {
    /** A fake policy: always returns the percentage it was given. */
    private class FixedDiscount implements PriceCalculator.DiscountPolicy {
        private final Decimal percent;
        FixedDiscount(Decimal percent) {
            this.percent = percent;
        }
        public Decimal discountPercent(Decimal amount) {
            return percent;
        }
    }

    @TestSetup
    static void setup() {
        TestDataFactory.courses(3, true); // prices 100, 101, 102
    }

    @IsTest
    static void totalWithoutDiscount() {
        List<Course__c> courses = [SELECT Price__c FROM Course__c];
        Assert.areEqual(303.00, new PriceCalculator(new FixedDiscount(0)).total(courses));
    }

    @IsTest
    static void totalWithFakeDiscount() {
        List<Course__c> courses = [SELECT Price__c FROM Course__c];
        Assert.areEqual(151.50, new PriceCalculator(new FixedDiscount(50)).total(courses));
    }

    @IsTest
    static void realSeasonalDiscount() {
        List<Course__c> expensive = new List<Course__c>{ new Course__c(Price__c = 2000) };
        Assert.areEqual(1800.00, new PriceCalculator(new PriceCalculator.SeasonalDiscount()).total(expensive));
    }

    @IsTest
    static void handlesMissingPrices() {
        Assert.areEqual(0.00, new PriceCalculator(new FixedDiscount(0)).total(new List<Course__c>{ new Course__c() }));
    }

    @IsTest
    static void runAsAnotherUser() {
        User u = TestDataFactory.standardUser();
        insert u;
        System.runAs(u) {
            Assert.areEqual('Tester', [SELECT LastName FROM User WHERE Id = :UserInfo.getUserId()].LastName);
        }
    }
}
