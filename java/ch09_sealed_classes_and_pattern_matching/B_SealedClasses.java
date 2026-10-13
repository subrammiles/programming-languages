package ch09_sealed_classes_and_pattern_matching;

/*
Sealed classes and interfaces (Java 17)
You list exactly which classes may extend/implement the type.
  sealed interface Shape permits Circle, Square, Rectangle
Each permitted subclass must be: final, sealed, or non-sealed.
Why? The compiler now knows ALL possible subtypes, so a switch can be checked
for completeness (see C_SwitchPatternMatching).
*/
public class B_SealedClasses {

    sealed interface Vehicle permits Car, Truck, Bike {}

    record Car(int seats) implements Vehicle {}               // records are implicitly final
    record Truck(double loadTons) implements Vehicle {}
    static non-sealed class Bike implements Vehicle {}       // anyone may extend Bike
    static class ElectricBike extends Bike {}                 // allowed because Bike is non-sealed

    // class Plane implements Vehicle {}   // error: Plane is not in the permits list

    sealed static abstract class Payment permits Card, Upi {}
    static final class Card extends Payment {}
    static final class Upi extends Payment {}

    public static void main(String[] args) {
        Vehicle[] all = { new Car(4), new Truck(10), new ElectricBike() };
        for (Vehicle v : all) {
            System.out.println(v.getClass().getSimpleName());
        }
        System.out.println(Vehicle.class.isSealed()); // true
        for (Class<?> c : Vehicle.class.getPermittedSubclasses()) {
            System.out.println("permitted: " + c.getSimpleName());
        }
        // permitted: Car, Truck, Bike
    }
}
