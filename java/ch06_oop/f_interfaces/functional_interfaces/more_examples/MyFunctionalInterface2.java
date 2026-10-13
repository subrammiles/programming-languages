package b_oops.e_interfaceexamples.functionalinterface;

public class MyFunctionalInterface2 {

	static class Test1 implements MakeAPhoneCall {

		@Override
		public void call(int phoneNumber) {
			System.out.println("I am in Test 1 interface");

		}

	}

	public static void main(String[] args) {

		MakeAPhoneCall call1 = new Test1();
		call1.call(0);

		/* We can directly create an object imaplemt the class body */

		MakeAPhoneCall call2 = new MakeAPhoneCall() {
			public void call(int phoneNumber) {
				System.out.println("I am in Test 2 interface");

			}
		};
		call2.call(0);

	}

}
