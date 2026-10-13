package oops.j_keywords.thisKeyword;

public class CurrentClassInstance {

	static class A {
		A getA() {
			return this;
		}

		void msg() {
			System.out.println("Hello java");
		}
	}

	public static void main(String args[]) {
		new A().getA().msg();
	}

}
