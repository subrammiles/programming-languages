package b_oops.c_methodOverriding;

public class A_MethodOverriding {

	static class Animal {
		public void displayInfo() {
			System.out.println("I am an animal.");
		}
	}

	static class Dog extends Animal {
		
		//Adding the @Override is optional 
		@Override
		public void displayInfo() {
			System.out.println("I am a dog.");
		}
	}
	
	//If child class and parent class contains the same methods ,it will take child class 
	

	public static void main(String[] args) {
		Dog d1 = new Dog();
		d1.displayInfo();
	}
}
