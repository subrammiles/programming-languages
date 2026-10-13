package b_oops.c_methodOverriding;

/*
 
 
Can we access the method of the superclass after overriding?
Well, the answer is Yes. To access the method of the superclass from the subclass, we use the super keyword.

 * */
public class B_SuperInOverriding {

	static class Animal {
		public void displayInfo() {
			System.out.println("I am an animal.");
		}
	}

	static class Dog extends Animal {
		public void displayInfo() {
			super.displayInfo();
			//super is a keyword gives the properties of super class
			/*We are calling the Super class method also*/
			System.out.println("And I am a dog.");
		}
	}

	public static void main(String[] args) {
		Dog d1 = new Dog();
		d1.displayInfo();
	}

}
