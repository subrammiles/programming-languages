package c_advanced.f_lambdaexpressions;


/*This class helps to reverse the string */
@FunctionalInterface
interface MyInterfaceForLambdaTest2 {
    // abstract method
    String reverse(String n);
}

public class LambdaExpressionWithParameters {
    public static void main( String[] args ) {
        // declare a reference to MyInterface
        // assign a lambda expression to the reference
    	MyInterfaceForLambdaTest2 ref = (str) -> {
            String result = "";
            for (int i = str.length()-1; i >= 0 ; i--)
            result += str.charAt(i);
            return result;
        };

        // call the method of the interface
        System.out.println("Lambda reversed = " + ref.reverse("Lambda"));
    }

}
