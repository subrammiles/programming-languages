package oops.j_keywords.thisKeyword;

public class InvokeCurrentClassConstructor {

	static class MyClass {
		MyClass() {
			System.out.println("hello a");
		}

		MyClass(int x) {
			this();
			System.out.println(x);
		}
	}

	public static void main(String args[]) {
		MyClass a = new MyClass(10);
	}

}
