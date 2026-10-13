package oops.j_keywords.superkeyword;

/*

A subclass inherits all the members (fields, methods, and nested classes) from its superclass except the Constructors.
Constructors are not members, so they are not inherited by subclasses.


* */

public class SuperKeyword3 {
	
	static class A {

		A() {
			System.out.println("I am  a Class A Constracture");
		};

	}

	static class B extends A {
		B() {
			super();
		}
	}

	public static void main(String[] args) {

		B b = new B();

	}


}
