package oops.j_keywords.finaltest;



public class Final2 {

	static class Test1 {

		final void run() {
			System.out.println("running");
		}

	}

	final static class Test2 extends Test1 {

		Test2() {
			run();
		}

	}

	public final static void main(String[] a) {

		System.out.println("Main");

		Test1 test1 = new Test1();
	}

}
//@Override
//void run(){
//	
//}
