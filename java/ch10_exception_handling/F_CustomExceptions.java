package ch10_exception_handling;

/*
Custom exceptions
 extends Exception         -> checked
 extends RuntimeException  -> unchecked (most common choice today)
Pass the original exception as the "cause" so the full story is kept in the stack trace.
*/
public class F_CustomExceptions {

    static class InsufficientFundsException extends Exception {
        private final double shortBy;

        InsufficientFundsException(double shortBy) {
            super("Insufficient funds, short by " + shortBy);
            this.shortBy = shortBy;
        }

        double shortBy() { return shortBy; }
    }

    static class PaymentFailedException extends RuntimeException {
        PaymentFailedException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    static double balance = 500;

    static void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) throw new InsufficientFundsException(amount - balance);
        balance -= amount;
    }

    static void pay(double amount) {
        try {
            withdraw(amount);
        } catch (InsufficientFundsException e) {
            throw new PaymentFailedException("Payment of " + amount + " failed", e); // wrap, keep cause
        }
    }

    public static void main(String[] args) {
        try {
            withdraw(800);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage() + " (shortBy=" + e.shortBy() + ")");
        }

        try {
            pay(1000);
        } catch (PaymentFailedException e) {
            System.out.println(e.getMessage());                 // Payment of 1000.0 failed
            System.out.println("cause: " + e.getCause().getMessage()); // Insufficient funds, short by 500.0
        }
    }
}
