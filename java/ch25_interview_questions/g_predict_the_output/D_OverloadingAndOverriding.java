package ch25_interview_questions.g_predict_the_output;

/*
Predict the output: overloading, overriding and hiding

  OVERRIDING (instance methods): chosen at RUNTIME by the object's actual class
  OVERLOADING: chosen at COMPILE TIME by the declared (static) types of the arguments
  HIDING: static methods and fields are NOT overridden; the declared type decides
  private methods are not inherited, so they cannot be overridden either
*/
public class D_OverloadingAndOverriding {

    static class Animal {
        String name = "animal";
        static String kind() { return "Animal.kind"; }
        String speak() { return "..."; }
        private String secret() { return "Animal secret"; }
        String revealSecret() { return secret(); }
    }

    static class Dog extends Animal {
        String name = "dog";                     // HIDES the parent field
        static String kind() { return "Dog.kind"; }   // HIDES the static method
        @Override String speak() { return "Woof"; }
        String secret() { return "Dog secret"; } // a NEW method, not an override
    }

    // Overloads
    static String print(Object o) { return "Object"; }
    static String print(String s) { return "String"; }
    static String print(Integer i) { return "Integer"; }

    static String number(long x) { return "long"; }
    static String number(Integer x) { return "Integer"; }
    static String number(int... x) { return "varargs"; }

    static String describe(Animal a) { return "describe(Animal)"; }
    static String describe(Dog d) { return "describe(Dog)"; }

    public static void main(String[] args) {
        Animal a = new Dog();

        System.out.println(a.speak());           // Woof         (overriding: runtime type)
        System.out.println(a.name);              // animal       (fields: declared type)
        System.out.println(((Dog) a).name);      // dog
        System.out.println(a.kind());            // Animal.kind  (static: declared type; compiler warns)
        System.out.println(a.revealSecret());    // Animal secret (private methods are not overridden)

        System.out.println(describe(a));         // describe(Animal)   (overloading: declared type)
        System.out.println(describe((Dog) a));   // describe(Dog)

        Object s = "hello";
        System.out.println(print(s));            // Object       (declared type Object)
        System.out.println(print("hello"));      // String
        // print(null) would not compile: String and Integer are equally specific (ambiguous)

        // Overload resolution order: 1. exact / widening  2. boxing  3. varargs
        System.out.println(number(5));           // long         (widening int -> long beats boxing)
        System.out.println(number(Integer.valueOf(5)));   // Integer
        System.out.println(number());            // varargs

        char c = 'x';
        System.out.println(print(String.valueOf(c)) + " " + number(c));   // String long   (char widens to long)
    }
}
