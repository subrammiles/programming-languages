package oops.g_inner_classes;


import java.awt.*;
import java.util.ArrayList;
import java.util.List;


class AnonymousDemo3 {

	static class Polygon {
		public void display() {
			System.out.println("Inside the Polygon class");
		}
	}
	public void createClass() {
		List<Polygon> actions = new ArrayList<Polygon>();
		actions.add(new Polygon() {
			public void display() {
				System.out.println("Inside an anonymous class.");
			}
		});
	}
}
public class AnonymousAsAnExpression {

}
