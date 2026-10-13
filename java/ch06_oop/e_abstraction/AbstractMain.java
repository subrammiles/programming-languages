package ch06_oop.e_abstraction;

public class AbstractMain {
	
	
	public static void main(String[] args) {
		
		//This will throw an error.We can not initialte the abstract class
		
		//AbstractClass abstractClass =new AbstractClass();
		
		
		AbstractClass abstractClass =new AbstractClass() {

			@Override
			void method1() {
				// TODO Auto-generated method stub
				
			}
			
		};
	}

}
