package b_oops.b_inhertience;



public class Inhertience {
	

	static class Animal {
		public void displayInfo() {
			System.out.println("I am an animal.");
		}
	}

	static class Dog extends Animal {
		public void animalType() {
			System.out.println("and I am an Dog");
		}	
	}
	
	static class Cat extends Animal {
		public void animalType() {
			System.out.println("and I am an Cat");
		}
		
	}

	public static void main(String[] args) {
		Dog d = new Dog();
		d.displayInfo();
		d.animalType();
		
		Cat c = new Cat();
		c.displayInfo();
		c.animalType();
	}

}
