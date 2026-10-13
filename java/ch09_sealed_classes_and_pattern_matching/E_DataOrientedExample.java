package ch09_sealed_classes_and_pattern_matching;

import java.util.List;

/*
Putting it together: "data-oriented programming"
 sealed interface  -> the closed set of possibilities
 records           -> the data for each possibility
 switch patterns   -> the logic, checked by the compiler for completeness
This replaces many uses of class hierarchies with overridden methods, and of the Visitor pattern.
*/
public class E_DataOrientedExample {

    sealed interface PaymentResult permits Success, Declined, Failed {}
    record Success(String transactionId, double amount) implements PaymentResult {}
    record Declined(String reason) implements PaymentResult {}
    record Failed(Exception error, int attempts) implements PaymentResult {}

    static String message(PaymentResult result) {
        return switch (result) {
            case Success(var id, var amount) when amount > 10_000 -> "Large payment " + id + " needs review";
            case Success(var id, var amount) -> "Paid " + amount + " (txn " + id + ")";
            case Declined(var reason) -> "Card declined: " + reason;
            case Failed(var error, var attempts) when attempts < 3 -> "Retrying after: " + error.getMessage();
            case Failed f -> "Gave up after " + f.attempts() + " attempts";
        };
    }

    public static void main(String[] args) {
        List<PaymentResult> results = List.of(
                new Success("T1", 499.0),
                new Success("T2", 25_000.0),
                new Declined("insufficient funds"),
                new Failed(new RuntimeException("timeout"), 1),
                new Failed(new RuntimeException("timeout"), 3));
        results.forEach(r -> System.out.println(message(r)));
        // Paid 499.0 (txn T1)
        // Large payment T2 needs review
        // Card declined: insufficient funds
        // Retrying after: timeout
        // Gave up after 3 attempts
    }
}
