public virtual with sharing class Rectangle extends Shape {
    protected Decimal width;
    protected Decimal height;

    public Rectangle(Decimal width, Decimal height) {
        this('Rectangle', width, height);
    }

    protected Rectangle(String name, Decimal width, Decimal height) {
        super(name);
        this.width = width;
        this.height = height;
    }

    public override Decimal area() {
        return width * height;
    }
}
