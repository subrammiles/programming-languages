package c_advanced.f_lambdaexpressions;

//GenericInterface.java
@FunctionalInterface
interface GenericInterface<T> {

	// generic method
	T func(T t);
}

//GenericLambda.java
public class GenericFunctionalInterfaceAndLambda {

	public static void main(String[] args) {

		// declare a reference to GenericInterface
		// the GenericInterface operates on String data
		// assign a lambda expression to it
		GenericInterface<String> reverse = (str) -> {

			String result = "";
			for (int i = str.length() - 1; i >= 0; i--)
				result += str.charAt(i);
			return result;
		};

		System.out.println("Lambda reversed = " + reverse.func("Lambda"));

		// declare another reference to GenericInterface
		// the GenericInterface operates on Integer data
		// assign a lambda expression to it
		GenericInterface<Integer> factorial = (n) -> {

			int result = 1;
			for (int i = 1; i <= n; i++)
				result = i * result;
			return result;
		};

		System.out.println("factorial of 5 = " + factorial.func(5));
	}
}
