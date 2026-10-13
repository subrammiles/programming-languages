package b_oops.a_object;

public class ObjectEx {

	static class Calculation {
		int fact(int n) {
			int fact = 1;
			for (int i = 1; i <= n; i++) {
				fact = fact * i;
			}
			return fact;
		}
	}
	
	
	public static void method1() {
		/* Calling method through a reference */
		Calculation c = new Calculation();
		int fact1 = c.fact(5);
		System.out.println("factorial is " + fact1);
	}

	void anonymousObject() {
		/* calling method with anonymous object */
		int fact2 = new Calculation().fact(5);
		//The sbove one creates a anonymous object without any name
		//Calculation() is a constractore ,so a object is created on fly
		System.out.println("factorial is " + fact2);
	}

	public static void main(String[] args) {

	}
}
