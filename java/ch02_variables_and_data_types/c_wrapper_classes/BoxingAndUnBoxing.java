package ch02_variables_and_data_types.c_wrapper_classes;

public class BoxingAndUnBoxing {

	public static void main(String args[]) {
		/* Autoboxing=Converting Primitives(int) into Non Primitives(Integer) */
		int a = 50;
		Integer a2 = Integer.valueOf(a);
		System.out.println(a + " " + a2);

		/* unboxing=Converting Integer to int */
		Integer b = new Integer(3);
		int b2 = b.intValue();// converting Integer to int explicitly
		System.out.println(b2);

	}

}
