package ch06_oop.g_inner_classes.anonymous_classes;

public class AnonymousClass {

	public static void main(String[] args) {
		Polygon p1 = new Polygon() {
			public void display() {
				System.out.println("Inside an anonymous class.");
			}
		};
		p1.display();

	}

}
