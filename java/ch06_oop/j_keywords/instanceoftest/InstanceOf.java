package oops.j_keywords.instanceoftest;

public class InstanceOf {

	static class Animal {

	}

	static class Dog extends Animal {

	}

	static class Dog2 extends Animal {

		static void test1(Animal a) {
			if (a instanceof Dog2) {
				Dog2 d = (Dog2) a;// downcasting
				System.out.println("ok downcasting performed");
			}else {
				System.out.println("Not a instance of Animal");
			}
		}

		static void test2(Animal a) {
			Dog2 d = (Dog2) a;// downcasting
			System.out.println("ok downcasting performed");

		}

	}

	static class India {

	}

	static void test1() {
		Integer i = 1;
		int j = 2;
		System.out.println("test" instanceof String);// true
		System.out.println(null instanceof String);// false
		System.out.println(i instanceof Integer);// true

	}

	static void test2() {
		Animal animal = new Animal();
		Dog dog = new Dog();
		System.out.println(animal instanceof Animal);// true
		System.out.println(dog instanceof Dog);// true
		System.out.println(dog instanceof Animal);// true
		System.out.println(animal instanceof Dog);// false

	}

	static void downcasting() {
		System.out.println("<<<<<We are passing Dog instance only>>>");
		Animal animal = new Dog2();
		Dog2.test1(animal);
		Dog2.test2(animal);
		System.out.println("<<<<We are not passing  Dog instance >>>>");
		Animal animal2 = new Animal();
		Dog2.test1(animal2);
		Dog2.test2(animal2);
	
	}

	public static void main(String[] args) {
		// test1();
		//test2();
		downcasting();

	}

}
