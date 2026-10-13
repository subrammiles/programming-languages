package oops.j_keywords.finaltest;

public class Final {

	final static class Test1 {

		Test1() {
			System.out.println("Con");
		}

	}

	public final static void main(String[] a) {

		System.out.println("Main");

		Test1 test1 = new Test1();
	}

}
