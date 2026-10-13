package oops.h_polymorphism;


public class Polymorphism {
    static class Animal {
        public void sound() {
            System.out.println("The animal makes a sound");
        }
    }

    static class Dog extends Animal {
        public void sound() {
            System.out.println("Dog says: Bow Bow");
        }
    }

    static class Cat extends Animal {
        public void sound() {
            System.out.println("Cat says: meow meow");
        }
    }

    static class Duck extends Animal {
        public void sound() {
            System.out.println("Duck says: quack quack");
        }
    }

    public static void main(String arg[]) {
        // Creating objects
        Animal animal = new Animal(); // Animal object
        Animal dog = new Dog(); // Dog object
        Animal cat = new Cat(); // Cat object
        Animal duck = new Duck(); // Duck object

        animal.sound();
        dog.sound();
        cat.sound();
        duck.sound();
    }

}

