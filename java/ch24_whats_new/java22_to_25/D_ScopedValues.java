package ch24_whats_new.java22_to_25;

/*
Scoped values (Java 25)
Share a value with everything called inside a block, without passing it as a parameter.
A modern replacement for ThreadLocal, designed for virtual threads:
 - immutable: called code can read it but not change it
 - automatically gone when the block ends (no leaks, no remove() needed)
 - cheap to share with child threads
Typical use: the current user or request id in a web server.
Requires JDK 25+.
*/
public class D_ScopedValues {

    static final ScopedValue<String> CURRENT_USER = ScopedValue.newInstance();

    static void handleRequest() {
        log("loading dashboard");
        loadOrders();
    }

    static void loadOrders() {
        log("loading orders for " + CURRENT_USER.get());
    }

    static void log(String message) {
        String user = CURRENT_USER.isBound() ? CURRENT_USER.get() : "anonymous";
        System.out.println("[" + user + "] " + message);
    }

    public static void main(String[] args) throws Exception {
        ScopedValue.where(CURRENT_USER, "asha").run(D_ScopedValues::handleRequest);
        // [asha] loading dashboard
        // [asha] loading orders for asha

        ScopedValue.where(CURRENT_USER, "ravi").run(D_ScopedValues::handleRequest);
        // [ravi] ...

        log("outside any scope"); // [anonymous] outside any scope

        // Each virtual thread can have its own binding
        Thread t1 = Thread.ofVirtual().start(() -> ScopedValue.where(CURRENT_USER, "meena").run(() -> log("in thread 1")));
        Thread t2 = Thread.ofVirtual().start(() -> ScopedValue.where(CURRENT_USER, "kiran").run(() -> log("in thread 2")));
        t1.join();
        t2.join();
    }
}
