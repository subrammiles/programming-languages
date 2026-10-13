package ch18_concurrency.m_completable_future;

import java.util.concurrent.CompletableFuture;

/*
CompletableFuture (Java 8) - Java's version of a JavaScript Promise.
 supplyAsync(fn)  -> run fn on another thread, returns a future value
 thenApply(fn)    -> transform the result      (like .then returning a value)
 thenAccept(fn)   -> use the result            (no return value)
 thenCompose(fn)  -> chain another async call  (like .then returning a promise)
 exceptionally / handle -> deal with errors   (like .catch)
 join()           -> wait for the result
*/
public class A_CompletableFutureBasics {

    static String fetchUser(int id) {
        sleep(300);
        if (id < 0) throw new IllegalArgumentException("bad id " + id);
        return "user" + id;
    }

    static CompletableFuture<Integer> fetchOrderCount(String user) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(200);
            return user.length();
        });
    }

    public static void main(String[] args) {
        CompletableFuture<String> greeting = CompletableFuture
                .supplyAsync(() -> fetchUser(7))
                .thenApply(String::toUpperCase)
                .thenApply(u -> "Hello " + u);
        System.out.println("doing other work while waiting...");
        System.out.println(greeting.join()); // Hello USER7

        // thenCompose: the next step is itself async
        int orders = CompletableFuture.supplyAsync(() -> fetchUser(42))
                .thenCompose(A_CompletableFutureBasics::fetchOrderCount)
                .join();
        System.out.println("orders: " + orders); // orders: 6

        // Error handling
        String result = CompletableFuture.supplyAsync(() -> fetchUser(-1))
                .exceptionally(ex -> "fallback (" + ex.getCause().getMessage() + ")")
                .join();
        System.out.println(result); // fallback (bad id -1)

        CompletableFuture.supplyAsync(() -> fetchUser(1))
                .handle((value, ex) -> ex == null ? "ok: " + value : "error")
                .thenAccept(System.out::println) // ok: user1
                .join();
    }

    static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
