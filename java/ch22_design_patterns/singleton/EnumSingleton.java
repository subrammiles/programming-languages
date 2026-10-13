package ch22_design_patterns.singleton;

/*
Singleton - exactly one instance in the whole program.
Three common ways:
 1. Enum (simplest, thread-safe, safe against reflection and serialization) - recommended
 2. Holder class (lazy and thread-safe, no synchronized needed)
 3. Double-checked locking with volatile (see SingletonExample.java)
Note: in apps using Spring etc., let the framework manage single instances instead.
*/
public class EnumSingleton {

    enum Config {
        INSTANCE;
        private int counter;
        int next() { return ++counter; }
    }

    static final class Registry {
        private Registry() { System.out.println("Registry created"); }

        private static class Holder {
            static final Registry INSTANCE = new Registry(); // created on first access to Holder
        }

        static Registry getInstance() { return Holder.INSTANCE; }
    }

    public static void main(String[] args) {
        System.out.println(Config.INSTANCE.next()); // 1
        System.out.println(Config.INSTANCE.next()); // 2

        System.out.println("before first use");
        Registry a = Registry.getInstance();         // "Registry created" printed here (lazy)
        Registry b = Registry.getInstance();
        System.out.println(a == b);                  // true
    }
}
