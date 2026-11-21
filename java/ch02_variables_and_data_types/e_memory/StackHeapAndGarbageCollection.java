package ch02_variables_and_data_types.e_memory;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;

/*
JVM memory: stack, heap, and garbage collection

STACK (one per thread)
  - holds method call frames: local variables, parameters, return addresses
  - primitive locals live here directly; for objects, only the REFERENCE lives here
  - freed automatically when the method returns
  - too deep (e.g. endless recursion) -> StackOverflowError

HEAP (shared by all threads)
  - every object created with `new` (and arrays) lives here
  - the String pool is part of the heap
  - when it is full and nothing more can be freed -> OutOfMemoryError

GARBAGE COLLECTION
  - the GC frees objects that are no longer REACHABLE from any "root"
    (local variables on stacks, static fields, active threads)
  - you cannot force it: System.gc() is only a hint
  - objects are moved between generations (young -> old); default collector is G1
  - finalize() is deprecated; use try-with-resources (AutoCloseable) or Cleaner instead

Memory leaks still happen in Java: objects stay reachable by accident
(e.g. a static List that keeps growing, listeners never removed, unbounded caches).

Reference types: strong (normal), SoftReference (cleared when memory is low),
WeakReference (cleared at the next GC), PhantomReference (clean-up notifications).
*/
public class StackHeapAndGarbageCollection {

    static final List<byte[]> LEAK = new ArrayList<>();   // static = a GC root: never collected

    static int square(int x) {          // x and result live in this method's stack frame
        int result = x * x;
        return result;                  // the frame is discarded after returning
    }

    public static void main(String[] args) {
        System.out.println(square(7));                         // 49

        // Two references on the stack, one object on the heap
        StringBuilder a = new StringBuilder("shared");
        StringBuilder b = a;
        b.append("!");
        System.out.println(a);                                 // shared!

        // Making an object unreachable
        Object data = new Object();
        WeakReference<Object> weak = new WeakReference<>(data);
        System.out.println(weak.get() != null);                // true    (still strongly reachable through `data`)
        data = null;                                           // the only strong reference is gone
        System.gc();                                           // a hint; HotSpot usually runs a GC here
        System.out.println("collected: " + (weak.get() == null));   // collected: true   (typically)

        // Memory usage of this JVM
        Runtime rt = Runtime.getRuntime();
        long usedMb = (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024);
        System.out.println("max heap (MB) > 0: " + (rt.maxMemory() / (1024 * 1024) > 0));   // max heap (MB) > 0: true
        System.out.println("used heap < max heap: " + (usedMb < rt.maxMemory() / (1024 * 1024)));   // used heap < max heap: true

        // A leak: every array stays reachable through the static list
        for (int i = 0; i < 5; i++) LEAK.add(new byte[1024 * 1024]);
        System.out.println("leaked MB still reachable: " + LEAK.size());   // leaked MB still reachable: 5
        LEAK.clear();                                          // now they can be collected

        // Run with a tiny heap to see OutOfMemoryError:  java -Xmx16m ...  and keep adding to LEAK
        // Useful tools: jcmd, jconsole, VisualVM, Java Flight Recorder (java -XX:StartFlightRecording)
    }
}
