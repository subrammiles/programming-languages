/**
 * Inheritance
 *  Classes are FINAL by default: mark a class "virtual" or "abstract" to allow subclasses.
 *  abstract methods must be overridden; virtual methods MAY be overridden (with "override").
 *  super.method() calls the parent version.
 */
public abstract with sharing class Shape {
    public String name { get; protected set; }

    protected Shape(String name) {
        this.name = name;
    }

    public abstract Decimal area();

    public virtual String describe() {
        return name + ' with area ' + area().setScale(2);
    }
}
