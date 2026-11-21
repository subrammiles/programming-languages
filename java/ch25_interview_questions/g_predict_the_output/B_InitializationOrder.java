package ch25_interview_questions.g_predict_the_output;

/*
Predict the output: the order in which Java initialises classes and objects.

When a class is first used (once per class):
  1. parent static fields and static blocks, in source order
  2. child static fields and static blocks
When `new Child()` runs (every time):
  3. parent instance fields and instance blocks, then the parent constructor body
  4. child instance fields and instance blocks, then the child constructor body
*/
public class B_InitializationOrder {

    static class Parent {
        static { System.out.println("1. Parent static block"); }
        { System.out.println("3. Parent instance block"); }

        Parent() {
            System.out.println("4. Parent constructor");
            describe();                        // calls the CHILD's override - dangerous!
        }

        void describe() { System.out.println("Parent.describe"); }
    }

    static class Child extends Parent {
        static { System.out.println("2. Child static block"); }
        private String name = "set by field initializer";
        { System.out.println("5. Child instance block"); }

        Child() {
            super();                           // implicit if you leave it out
            System.out.println("6. Child constructor, name = " + name);
        }

        @Override
        void describe() {
            // runs from Parent's constructor, BEFORE Child's fields are initialised
            System.out.println("   Child.describe sees name = " + name);
        }
    }

    static class Lazy {
        static { System.out.println("Lazy class loaded"); }
        static final int CONSTANT = 42;        // a compile-time constant: reading it does NOT load the class
        static int counter = 0;
    }

    public static void main(String[] args) {
        System.out.println("main starts");
        new Child();
        System.out.println("--- second object: no static blocks this time ---");
        new Child();

        System.out.println("--- class loading is lazy ---");
        System.out.println(Lazy.CONSTANT);     // 42 (no "Lazy class loaded")
        System.out.println(Lazy.counter);      // "Lazy class loaded" first, then 0
    }
}
/* Output:
main starts
1. Parent static block
2. Child static block
3. Parent instance block
4. Parent constructor
   Child.describe sees name = null
5. Child instance block
6. Child constructor, name = set by field initializer
--- second object: no static blocks this time ---
3. Parent instance block
4. Parent constructor
   Child.describe sees name = null
5. Child instance block
6. Child constructor, name = set by field initializer
--- class loading is lazy ---
42
Lazy class loaded
0
*/
