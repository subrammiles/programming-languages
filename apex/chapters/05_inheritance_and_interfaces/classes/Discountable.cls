/**
 * An interface lists methods a class promises to provide (no bodies, no fields).
 * A class can implement many interfaces but extend only one class.
 * Interface methods are implemented as public (or global).
 */
public interface Discountable {
    Decimal discountedPrice(Decimal percent);
}
