package oops.i_nested_classes.staticnested;

public class OuterClass {

	static int x = 1;

	int y = 2;

	static class StaticNestedClass {
		public void myinnermethod1() {
			System.out.println(x);

		}
	}

}
