package b_oops.e_interfaceexamples.interfaceproperties;

/*Interface can extends n number of interfaces*/
public class InterfaceExtension {



	public interface Interface1 {
		void method1();
	}

	public interface Interface2 {
		void method2();
	}

	public interface Interface3 extends Interface1 {
		void method3();
	}

	public interface Interface4 extends Interface1, Interface2, Interface3 {
		void method4();
	}
	
	
	public abstract  class class6 {

	}
	
	
//	public interface Interface5  extends   class6{
//		
//	}
	
	
	

	public class class4 implements Interface1, Interface2 {

		@Override
		public void method2() {
			// TODO Auto-generated method stub

		}

		@Override
		public void method1() {
			// TODO Auto-generated method stub

		}

	}
	
	
	/*A class can not implememt a non interface*/
	
//	public class class5 implements class2{
//		
//	}
	
	/*A class can not implememt a non interface.Even though class4 is implementig interfaces*/
//    public class class6 implements class4{
//		
//	}

}
