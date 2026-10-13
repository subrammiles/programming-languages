package c_advanced.e_generics.wildcard;

import java.util.ArrayList;
import java.util.List;

public class WildcardInGenerics {
	abstract static class Shape {
		abstract void draw();
	}

	static class Rectangle extends Shape {
		void draw() {
			System.out.println("drawing rectangle");
		}
	}

	static public class Circle extends Shape {
		void draw() {
			System.out.println("drawing circle");
		}
	}
	// creating a method that accepts only child class of Shape
	public static void drawShapes(List<? extends Shape> lists) {
		for (Shape s : lists) {
			s.draw();// calling method of Shape class by child class instance
		}
	}
	public static void main(String args[]) {
		List<Rectangle> list1 = new ArrayList<Rectangle>();
		list1.add(new Rectangle());

		List<Circle> list2 = new ArrayList<Circle>();
		list2.add(new Circle());
		list2.add(new Circle());

		drawShapes(list1);
		drawShapes(list2);
	}
}




