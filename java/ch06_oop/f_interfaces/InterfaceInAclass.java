package b_oops.e_interfaceexamples.interfaceproperties;



/*
 nterfaces (or classes) can have only public and default access specifiers when declared outside any other class (Refer this for details). 
 This interface declared in a class can either be default, public, protected not private. While implementing the interface, we mention the 
 interface as c_name.i_name where c_name is
  the name of the class in which it is nested and i_name is the name of the interface itself.
 * */

class Class1WithInterface1{
	
	
	protected interface Interface1{
		void start();
	}
}

class MyImplementingClass implements Class1WithInterface1.Interface1  {

	@Override
	public void start() {
		
		
		System.out.println("Hello");
		
	}
	
}




public class InterfaceInAclass {
	
	 public static void main(String[] args)
	    {
		 Class1WithInterface1.Interface1 obj;
		 MyImplementingClass t = new MyImplementingClass();
	        obj=t;
	        obj.start();
	    }

}
