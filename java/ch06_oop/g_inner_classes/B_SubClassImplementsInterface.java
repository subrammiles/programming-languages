package oops.g_inner_classes;

interface PolygonInterface {
	public void display();
}

class AnonymousDemo2 {
	public void createClass() {

		// anonymous class is a subclass that is  implementing interface "PolygonInterface"
		PolygonInterface p1 = new PolygonInterface() {
			public void display() {
				System.out.println("Inside an anonymous class.");
			}
		};
		p1.display();
	}
}

public class B_SubClassImplementsInterface {
	public static void main(String[] args) {
		AnonymousDemo2 an = new AnonymousDemo2();
		an.createClass();
	}
}

