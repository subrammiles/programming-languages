package b_oops.abstraction.basic1.AnonymousSubclass;

public class InheritClassA {
	
	public static void main(String[] args)
    {
  
		 /*This linw will throw an error as we can not init Abstract class*/
		
		
		//ClassA obj = new ClassA();
        
		
		// classA object  points to anonymous subclass
		ClassA classA = new ClassA() {};
		classA.printHello();
    }

}
