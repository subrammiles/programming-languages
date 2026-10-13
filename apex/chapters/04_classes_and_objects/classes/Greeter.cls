/**
 * A first class.
 *  - every saved class lives in its own .cls file, with a matching .cls-meta.xml
 *  - static methods belong to the class:   Greeter.sayHello()
 *  - instance methods need an object:      new Greeter('Asha').greet()
 *  - access modifiers: private (default), protected, public, global (visible outside a managed package)
 *  - "with sharing" respects the running user's record access (see chapter 14)
 */
public with sharing class Greeter {
    private String name; // instance variable (field)
    private static Integer greetingsSent = 0; // shared by all instances

    public Greeter(String name) {
        // constructor: same name as the class, no return type
        this.name = name;
    }

    public Greeter() {
        this('World'); // constructor overloading: call another constructor with this(...)
    }

    public static String sayHello() {
        return 'Hello from a static method';
    }

    public String greet() {
        greetingsSent++;
        return 'Hello, ' + name + '!';
    }

    public String greet(String greeting) {
        // method overloading: same name, different parameters
        greetingsSent++;
        return greeting + ', ' + name + '!';
    }

    public static Integer getGreetingsSent() {
        return greetingsSent;
    }
}
