package b_oops.e_interfaceexamples.interfaceproperties;




/*
 
 In the above example, access specifier is public even if we have not written public. 
 If we try to change access specifier of interface to anything other than public, we get compiler error. Remember, interface members can only be public..
 * */
interface  Interface1WithInterface1{
	
	 interface Interface1{
		void start();
	}
}

class MyImplementingClass3 implements Interface1WithInterface1.Interface1  {

	@Override
	public void start() {
		System.out.println("Hello");
		
	}
	
}




public class InterfaceInAnotherInterface {
	
	 public static void main(String[] args)
	    {
		 Interface1WithInterface1.Interface1 obj;
		 MyImplementingClass3 t = new MyImplementingClass3();
	        obj=t;
	        obj.start();
	    }

}