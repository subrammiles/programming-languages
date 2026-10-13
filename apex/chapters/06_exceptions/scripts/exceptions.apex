// Run: sf apex run --file chapters/06_exceptions/scripts/exceptions.apex
System.debug(ExceptionExamples.classify(1)); // value 5
System.debug(ExceptionExamples.classify(9)); // ListException: List index out of bounds: 9
System.debug(ExceptionExamples.divide(10, 0)); // MathException: Divide by 0
System.debug(ExceptionExamples.nullSafety());
System.debug(ExceptionExamples.wrapped());
try {
    ExceptionExamples.withdraw(100, 500);
} catch (InsufficientFundsException e) {
    System.debug(e.getTypeName() + ': ' + e.getMessage());
}
