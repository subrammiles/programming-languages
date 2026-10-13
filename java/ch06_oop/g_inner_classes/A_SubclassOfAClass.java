package oops.g_inner_classes;



class Polygon {
	public void display() {
		System.out.println("Inside the Polygon class");
	}
}

class AnonymousDemo {
	public void createClass() {
		// creation of anonymous class extending class Polygon

		//Polygon is a parent class and anonymous class that
		//we are creating is a child class
		Polygon p1 = new Polygon() {
			public void display() {
				System.out.println("Inside an anonymous class.");
			}
		};
		p1.display();
	}
}

public class A_SubclassOfAClass {

	public static void main(String[] args) {

		AnonymousDemo an = new AnonymousDemo();
		an.createClass();

	}

}
