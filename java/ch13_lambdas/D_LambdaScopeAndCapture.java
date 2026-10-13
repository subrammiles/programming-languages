package ch13_lambdas;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

/*
Variable capture
A lambda can use local variables from the surrounding method only if they are
"effectively final" (never reassigned after initialisation).
"this" inside a lambda means the enclosing object (unlike an anonymous class).
*/
public class D_LambdaScopeAndCapture {

    private final String name = "outer object";

    void demo() {
        Runnable lambda = () -> System.out.println("lambda this = " + this.name);
        Runnable anon = new Runnable() {
            private final String name = "anonymous class";
            public void run() { System.out.println("anonymous this = " + this.name); }
        };
        lambda.run(); // lambda this = outer object
        anon.run();   // anonymous this = anonymous class
    }

    public static void main(String[] args) {
        int base = 10;
        Supplier<Integer> s = () -> base + 1;
        // base = 20;  // error: base would no longer be effectively final
        System.out.println(s.get()); // 11

        // Mutating an object is allowed; reassigning the variable is not
        List<String> log = new ArrayList<>();
        Runnable addEntry = () -> log.add("entry");
        addEntry.run();
        addEntry.run();
        System.out.println(log); // [entry, entry]

        new D_LambdaScopeAndCapture().demo();
    }
}
