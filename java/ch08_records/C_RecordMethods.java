package ch08_records;

/*
Records can have:
 - extra (non-canonical) constructors, which must call this(...)
 - instance methods
 - static fields and static factory methods
 - nested types
They can NOT have extra instance fields.
*/
public class C_RecordMethods {

    record Money(long amountInPaise, String currency) {

        static final Money ZERO_INR = new Money(0, "INR");

        Money(double rupees) {                    // extra constructor
            this(Math.round(rupees * 100), "INR");
        }

        static Money ofRupees(long rupees) {      // static factory
            return new Money(rupees * 100, "INR");
        }

        Money plus(Money other) {                 // returns a NEW record
            if (!currency.equals(other.currency)) throw new IllegalArgumentException("currency mismatch");
            return new Money(amountInPaise + other.amountInPaise, currency);
        }

        @Override
        public String toString() {                // you may override the generated methods
            return String.format("%s %.2f", currency, amountInPaise / 100.0);
        }
    }

    public static void main(String[] args) {
        Money a = Money.ofRupees(100);
        Money b = new Money(49.99);
        System.out.println(a.plus(b));        // INR 149.99
        System.out.println(Money.ZERO_INR);   // INR 0.00
    }
}
