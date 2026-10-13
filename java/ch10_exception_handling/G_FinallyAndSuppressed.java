package ch10_exception_handling;

/*
1. finally always runs: after try, after catch, even after return.
2. try-with-resources closes resources automatically, in reverse order.
   If both the body and close() throw, the close() exception is "suppressed"
   and attached to the main one.
*/
public class G_FinallyAndSuppressed {

    static int tricky() {
        try {
            return 1;
        } finally {
            System.out.println("finally runs even after return");
        }
    }

    static class Resource implements AutoCloseable {
        private final String name;

        Resource(String name) {
            this.name = name;
            System.out.println("open " + name);
        }

        @Override
        public void close() {
            System.out.println("close " + name);
            throw new IllegalStateException("error while closing " + name);
        }
    }

    public static void main(String[] args) {
        System.out.println(tricky());

        try (Resource a = new Resource("A"); Resource b = new Resource("B")) {
            throw new RuntimeException("error in body");
        } catch (RuntimeException e) {
            System.out.println("caught: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) {
                System.out.println("  suppressed: " + s.getMessage());
            }
        }
        // open A, open B, close B, close A
        // caught: error in body
        //   suppressed: error while closing B
        //   suppressed: error while closing A
    }
}
