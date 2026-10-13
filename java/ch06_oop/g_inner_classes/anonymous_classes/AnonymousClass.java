package b_oops.nestedclasses.anonymousClass;

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
