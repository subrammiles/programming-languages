@IsTest
private class ModernApexTest {
    @IsTest
    static void nullCoalescingAndSafeNavigation() {
        Assert.areEqual('Unknown account', ModernApex.nullCoalescing(null));
        Assert.areEqual('Unknown account', ModernApex.nullCoalescing(new Account()));
        Assert.areEqual('Acme', ModernApex.nullCoalescing(new Account(Name = 'Acme')));
    }

    @IsTest
    static void comparatorSort() {
        List<Account> sorted = ModernApex.sortWithComparator(
            new List<Account>{ new Account(Name = 'Globex'), new Account(Name = 'Acme'), new Account(Name = 'Initech Corp') }
        );
        Assert.areEqual('Acme', sorted[0].Name);
        Assert.areEqual('Initech Corp', sorted[2].Name);
    }
}
