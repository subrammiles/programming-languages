package c_advanced.f_lambdaexpressions;

import java.lang.FunctionalInterface;

interface MyInterfaceForLambdaTest {
	double getPiValue();
}

public class GetPiValueUsingLambda {

	static void test1() {
		/* Annonymous class */
		MyInterfaceForLambdaTest ref = new MyInterfaceForLambdaTest() {
			@Override
			public double getPiValue() {
				return 3.1415;
			}

		};
		System.out.println("Value of Pi = " + ref.getPiValue());
		/* Lambda expression */
		MyInterfaceForLambdaTest ref2 = () -> 3.1415;
		System.out.println("Value of Pi = " + ref2.getPiValue());

	}

	public static void main(String[] args) {
		test1();

	}

}
