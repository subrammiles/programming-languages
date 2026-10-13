package b_oops.e_interfaceexamples.functionalinterface;

import b_oops.e_interfaceexamples.functionalinterface.MyFunctionalInterface2.Test1;

public class FunctionalInterfaceLambda {

	static class Test1 {

		public Test1(MakeAPhoneCall call) {

		}

	}

	public static void main(String[] args) {

		MakeAPhoneCall call1 = new MakeAPhoneCall() {
			public void call(int phoneNumber) {
				System.out.println("I am in Test 2 interface");

			}
		};
		call1.call(0);

		new Test1(call1);

		/* Example 2:Threads */

		new Thread(() -> {
			System.out.println("New thread created");
		}).start();

	}

}
