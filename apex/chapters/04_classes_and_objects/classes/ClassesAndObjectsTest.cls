@IsTest
private class ClassesAndObjectsTest {
    @IsTest
    static void staticAndInstanceMethods() {
        Assert.areEqual('Hello from a static method', Greeter.sayHello());
        Greeter g = new Greeter('Asha');
        Assert.areEqual('Hello, Asha!', g.greet());
        Assert.areEqual('Namaste, Asha!', g.greet('Namaste'));
        Assert.areEqual('Hello, World!', new Greeter().greet());
        Assert.areEqual(3, Greeter.getGreetingsSent());
    }

    @IsTest
    static void propertiesAndEncapsulation() {
        BankAccount acc = new BankAccount('Ravi', 500);
        acc.deposit(250);
        Assert.isTrue(acc.withdraw(100));
        Assert.isFalse(acc.withdraw(10000));
        Assert.areEqual(650, acc.balance);
        Assert.areEqual('INR 650.00', acc.displayBalance);
        Assert.areEqual(2, acc.history.size());
        Assert.areEqual('withdraw', acc.history[1].kind);
    }

    @IsTest
    static void invalidDepositThrows() {
        try {
            new BankAccount('X', 0).deposit(-5);
            Assert.fail('expected an exception');
        } catch (IllegalArgumentException e) {
            Assert.areEqual('Deposit must be positive', e.getMessage());
        }
    }
}
