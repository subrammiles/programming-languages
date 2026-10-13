package oops.d_consructor;


/*We can have multiple Constructor, To call another Constructor in the same class use this()*/

public class E_ConstructorChaining {

    static class MathOperation {

        MathOperation() {

        }

        MathOperation(int number) {

            System.out.println("Numbers addition is  = " + number);

        }

        MathOperation(int number1, int number2) {
            this(number1 + number2);
        }

    }

    public static void main(String[] args) {

        MathOperation operation = new MathOperation(2, 4);

    }

}
