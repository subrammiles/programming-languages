package ch06_oop.g_inner_classes.anonymous_classes;

public class AnonymousClass2 {

	public static void main(String[] args) {
		IPolygon p1 = new IPolygon() {
			public void display() {
				System.out.println("Inside an anonymous class.");
			}
		};
		p1.display();

	}

}
