public with sharing class Circle extends Shape {
    private Decimal radius;

    public Circle(Decimal radius) {
        super('Circle');
        this.radius = radius;
    }

    public override Decimal area() {
        return Math.PI * radius * radius;
    }
}
