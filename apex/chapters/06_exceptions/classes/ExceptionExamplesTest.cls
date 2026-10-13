@IsTest
private class ExceptionExamplesTest {
    @IsTest
    static void catchesBuiltInExceptions() {
        Assert.areEqual('value 10', ExceptionExamples.classify(0));
        Assert.isTrue(ExceptionExamples.classify(5).startsWith('ListException'));
        Assert.isTrue(ExceptionExamples.divide(1, 0).startsWith('MathException'));
        Assert.areEqual('NullPointerException caught', ExceptionExamples.nullSafety());
    }

    @IsTest
    static void customException() {
        Assert.areEqual(50, ExceptionExamples.withdraw(100, 50));
        try {
            ExceptionExamples.withdraw(100, 500);
            Assert.fail('expected InsufficientFundsException');
        } catch (InsufficientFundsException e) {
            Assert.isTrue(e.getMessage().contains('balance is 100'));
        }
    }

    @IsTest
    static void exceptionChaining() {
        Assert.areEqual('Could not read the amount (cause: System.TypeException)', ExceptionExamples.wrapped());
    }
}
