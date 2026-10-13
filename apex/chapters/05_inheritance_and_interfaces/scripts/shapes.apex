// Run: sf apex run --file chapters/05_inheritance_and_interfaces/scripts/shapes.apex
List<Shape> shapes = new List<Shape>{ new Circle(1), new Rectangle(2, 3), new Square(2) };
for (Shape s : shapes) {
    System.debug(s.describe());
}
// Circle with area 3.14
// Rectangle with area 6.00
// A square! Square with area 4.00

List<Product> products = new List<Product>{ new Product('Bag', 900), new Product('Pen', 10) };
products.sort();
System.debug(products[0].name + ' is cheapest; 10% off the bag: ' + products[1].discountedPrice(10));
