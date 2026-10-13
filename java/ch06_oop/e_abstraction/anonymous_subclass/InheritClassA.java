package ch06_oop.e_abstraction.anonymous_subclass;

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
