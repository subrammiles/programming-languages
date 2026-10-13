package b_oops.d_methodoverloading;

public class MethodOverloadingWithTypePromotion {

	static void sum(int a, long b) {
		System.out.println(a + b);
	}

	static void sum(int a, int b, int c) {
		System.out.println(a + b + c);
	}

	static void withoutAmbigity() {
		sum(20, 20);// now second int literal will be promoted to long
		sum(20, 20, 20);
	}
	
	///

	static void sum2(int a, long b) {
		System.out.println("a method invoked");
	}

	static void sum2(long a, int b) {
		System.out.println("b method invoked");
	}

	static void withAmbigity() {
		//sum2(2, 3);// now ambiguity. Which method to take?

	}

	public static void main(String args[]) {
		withoutAmbigity();
		withAmbigity();
	}

}
