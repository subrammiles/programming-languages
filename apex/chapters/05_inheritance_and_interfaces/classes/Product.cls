/**
 * Implements two interfaces: our own Discountable and the built-in Comparable,
 * which lets List.sort() order Products.
 */
public with sharing class Product implements Discountable, Comparable {
    public String name { get; private set; }
    public Decimal price { get; private set; }

    public Product(String name, Decimal price) {
        this.name = name;
        this.price = price;
    }

    public Decimal discountedPrice(Decimal percent) {
        return (price * (100 - percent) / 100).setScale(2);
    }

    public Integer compareTo(Object other) {
        Product that = (Product) other;
        if (price == that.price) {
            return 0;
        }
        return price > that.price ? 1 : -1;
    }
}
