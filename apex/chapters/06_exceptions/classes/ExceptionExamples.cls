/**
 * Exceptions
 *  try { } catch (SpecificException e) { } catch (Exception e) { } finally { }
 *  throw new MyException('message');
 * Common built-in exceptions:
 *  NullPointerException, ListException (index out of bounds), TypeException (bad conversion),
 *  MathException (divide by zero), DmlException, QueryException, CalloutException, LimitException*
 *  (*LimitException can NOT be caught: hitting a governor limit always stops the transaction)
 */
public with sharing class ExceptionExamples {
    public static String classify(Integer index) {
        List<Integer> numbers = new List<Integer>{ 10, 20 };
        try {
            Integer value = numbers[index];
            return 'value ' + (100 / value);
        } catch (ListException e) {
            return 'ListException: ' + e.getMessage();
        } finally {
            System.debug('finally always runs');
        }
    }

    public static String divide(Integer a, Integer b) {
        try {
            return String.valueOf(a / b);
        } catch (MathException e) {
            return 'MathException: ' + e.getMessage(); // Divide by 0
        }
    }

    public static String nullSafety() {
        Account acc;
        try {
            return acc.Name;
        } catch (NullPointerException e) {
            return 'NullPointerException caught';
        }
    }

    public static Decimal withdraw(Decimal balance, Decimal amount) {
        if (amount > balance) {
            throw new InsufficientFundsException('Cannot withdraw ' + amount + ', balance is ' + balance);
        }
        return balance - amount;
    }

    public static String wrapped() {
        try {
            try {
                Integer.valueOf('abc');
            } catch (TypeException e) {
                throw new InsufficientFundsException('Could not read the amount', e); // keep the cause
            }
        } catch (InsufficientFundsException e) {
            return e.getMessage() + ' (cause: ' + e.getCause().getTypeName() + ')';
        }
        return 'unreachable';
    }
}
