@IsTest
private class InheritanceTest {
    @IsTest
    static void polymorphism() {
        List<Shape> shapes = new List<Shape>{ new Circle(1), new Rectangle(2, 3), new Square(2) };
        List<String> descriptions = new List<String>();
        for (Shape s : shapes) {
            descriptions.add(s.describe()); // each object runs its own version
        }
        Assert.areEqual('Circle with area 3.14', descriptions[0]);
        Assert.areEqual('Rectangle with area 6.00', descriptions[1]);
        Assert.areEqual('A square! Square with area 4.00', descriptions[2]);
    }

    @IsTest
    static void instanceofChecks() {
        Shape s = new Square(1);
        Assert.isTrue(s instanceof Rectangle);
        Assert.isFalse(s instanceof Circle);
    }

    @IsTest
    static void interfaces() {
        Discountable d = new Product('Pen', 200);
        Assert.areEqual(180.00, d.discountedPrice(10));

        List<Product> products = new List<Product>{ new Product('Bag', 900), new Product('Pen', 10), new Product('Book', 250) };
        products.sort(); // uses compareTo
        Assert.areEqual('Pen', products[0].name);
        Assert.areEqual('Bag', products[2].name);
    }
}
