package ch13_lambdas;

import java.util.function.BiFunction;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;

/*
java.util.function - ready-made functional interfaces, so you rarely need your own.

 Interface         Method               Takes -> Returns
 Supplier<T>       get()                ()    -> T
 Consumer<T>       accept(T)            T     -> void
 Function<T,R>     apply(T)             T     -> R
 Predicate<T>      test(T)              T     -> boolean
 UnaryOperator<T>  apply(T)             T     -> T
 BiFunction<T,U,R> apply(T,U)           T,U   -> R
 BinaryOperator<T> apply(T,T)           T,T   -> T
Primitive versions avoid boxing: IntPredicate, IntFunction, ToIntFunction, IntBinaryOperator ...
*/
public class A_BuiltInFunctionalInterfaces {

    public static void main(String[] args) {
        Supplier<Double> random = () -> Math.random();
        Consumer<String> printer = s -> System.out.println(">> " + s);
        Function<String, Integer> length = s -> s.length();
        Predicate<Integer> isEven = n -> n % 2 == 0;
        UnaryOperator<String> shout = s -> s.toUpperCase() + "!";
        BiFunction<Integer, Integer, Integer> power = (b, e) -> (int) Math.pow(b, e);
        BinaryOperator<Integer> max = BinaryOperator.maxBy(Integer::compare);

        System.out.println(random.get() < 1);   // true
        printer.accept("hello");                // >> hello
        System.out.println(length.apply("java")); // 4
        System.out.println(isEven.test(10));    // true
        System.out.println(shout.apply("hi"));  // HI!
        System.out.println(power.apply(2, 10)); // 1024
        System.out.println(max.apply(3, 9));    // 9
    }
}
