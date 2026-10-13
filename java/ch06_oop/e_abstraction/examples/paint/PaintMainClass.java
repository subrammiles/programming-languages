package oops.e_abstraction.examples.paint;

public class PaintMainClass {

	static void paint(A_PaintAnObject object, String color) {
		object.chooseColor(color);
		object.paint();
	}

	public static void main(String[] args) {

		int userOption = 1;
		if (userOption == 1) {
			paint(new C_Reactangle(), "RED");
		} else if (userOption == 2) {
			paint(new B_Circle(), "RED");
		}

	}

}
