package ch13_lambdas;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

/*
Combining functions
 Function:  andThen, compose, identity
 Predicate: and, or, negate, Predicate.not, isEqual
*/
public class C_FunctionComposition {

    public static void main(String[] args) {
        Function<Integer, Integer> doubleIt = x -> x * 2;
        Function<Integer, Integer> addTen = x -> x + 10;

        System.out.println(doubleIt.andThen(addTen).apply(5)); // 20  -> (5*2)+10
        System.out.println(doubleIt.compose(addTen).apply(5)); // 30  -> (5+10)*2

        Predicate<String> notEmpty = s -> !s.isEmpty();
        Predicate<String> shortWord = s -> s.length() < 5;
        Predicate<String> startsWithA = s -> s.startsWith("a");

        List<String> words = List.of("apple", "ant", "", "bee", "avocado", "cat");
        System.out.println(words.stream().filter(notEmpty.and(shortWord)).toList());       // [ant, bee, cat]
        System.out.println(words.stream().filter(startsWithA.or(shortWord.and(notEmpty))).toList());
        // [apple, ant, bee, avocado, cat]
        System.out.println(words.stream().filter(Predicate.not(String::isEmpty)).toList()); // all but ""

        // Build a pipeline from a list of steps
        List<Function<String, String>> steps = List.of(String::strip, String::toLowerCase, s -> s.replace(' ', '-'));
        Function<String, String> slugify = steps.stream().reduce(Function.identity(), Function::andThen);
        System.out.println(slugify.apply("  Hello Java World ")); // hello-java-world
    }
}
