package b_oops.e_interfaceexamples.functionalinterface;

/*
 A functional interface is an interface that contains only one abstract method. 
 They can have only one functionality to exhibit. 
 * */

/*
 *eg:
 Runnable, ActionListener, Comparable
 * */
@FunctionalInterface
interface MakeAPhoneCall {
	void call(int phoneNumber);
}
/* If you add another method ,it will throws an error */

public class MyFunctionalInterface {

	static class Test1 implements MakeAPhoneCall {

		@Override
		public void call(int phoneNumber) {
			System.out.println("I am in Test 1 interface");

		}

	}

	static class Test2 implements MakeAPhoneCall {
		/* You can ignore override */

		public void call(int phoneNumber) {
			System.out.println("I am in Test 2 interface");

		}

	}

	public static void main(String[] args) {

		MakeAPhoneCall call1 = new Test1();
		call1.call(0);

		MakeAPhoneCall call2 = new Test2();
		call2.call(0);

	}

}
