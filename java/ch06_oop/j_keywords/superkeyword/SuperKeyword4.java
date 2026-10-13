package oops.j_keywords.superkeyword;

/*
If we don't add any default constracture we must invoke the super class constracture with super keyword

* */

public class SuperKeyword4 {

	static class A {

		A(int a) {

		};

	}

	static class B extends A {
		B(int b) {
			super(b);
			///If you don't want to use super keyword ,add a default constracture in Class A
		}
	}

	public static void main(String[] args) {

		B b = new B(0);

	}

}
