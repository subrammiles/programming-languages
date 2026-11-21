package ch25_interview_questions.g_predict_the_output;

/*
Predict the output: try / catch / finally

Key facts:
  - finally runs after try or catch, even after a `return`
  - a `return` in finally REPLACES the earlier return value or exception (never do this)
  - the value of a return expression is computed BEFORE finally runs
  - finally does not run after System.exit()
  - catch blocks are checked top to bottom; a subclass after its superclass does not compile
*/
public class C_ExceptionsAndFinally {

    static int q1() {
        try {
            return 1;
        } finally {
            System.out.println("q1 finally runs");
        }
    }

    @SuppressWarnings("finally")
    static int q2() {
        try {
            return 1;
        } finally {
            return 2;                          // overrides the try's return value
        }
    }

    static int q3() {
        int x = 10;
        try {
            return x;                          // the value 10 is saved here
        } finally {
            x = 20;                            // changing x does not change the saved value
        }
    }

    static StringBuilder q4() {
        StringBuilder sb = new StringBuilder("a");
        try {
            return sb;                         // the REFERENCE is saved
        } finally {
            sb.append("b");                    // but the object it points to can still change
        }
    }

    @SuppressWarnings("finally")
    static String q5() {
        try {
            throw new RuntimeException("lost");
        } finally {
            return "finally wins";             // swallows the exception!
        }
    }

    static String q6() {
        try {
            throw new IllegalStateException("boom");
        } catch (RuntimeException e) {
            return "caught " + e.getClass().getSimpleName();
        } finally {
            System.out.println("q6 finally runs");
        }
    }

    static void q7() {
        try {
            try {
                throw new RuntimeException("inner");
            } finally {
                System.out.println("inner finally");
            }
        } catch (RuntimeException e) {
            System.out.println("outer caught " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println(q1());
        // q1 finally runs
        // 1
        System.out.println(q2());              // 2
        System.out.println(q3());              // 10
        System.out.println(q4());              // ab
        System.out.println(q5());              // finally wins
        System.out.println(q6());
        // q6 finally runs
        // caught IllegalStateException
        q7();
        // inner finally
        // outer caught inner

        // Q8: integer division by zero vs double
        try {
            System.out.println(10 / 0);
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException");   // ArithmeticException
        }
        System.out.println(10.0 / 0);          // Infinity

        // Q9: finally and System.exit
        try {
            System.out.println("about to exit");          // about to exit
            System.exit(0);
        } finally {
            System.out.println("never printed");
        }
    }
}
