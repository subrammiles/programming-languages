package b_oops.b_inhertience;



public class Inhertience2 {
	
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
		
		/*As Cat and Dog extends Animal.Both belongs to Animal type*/
		Animal animal1 = new Dog();
		Animal animal2 = new Cat();
		animal1.displayInfo();
		animal2.displayInfo();
	
		//animal1.animalType();
		
		//You can not call animalType as it is property of child class.Parent class can not know the child
		//class properties
		
		Cat c = new Cat();
		c.displayInfo();
		c.animalType();
	}

}
