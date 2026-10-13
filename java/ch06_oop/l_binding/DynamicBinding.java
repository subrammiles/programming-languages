package b_oops.binding;

public class DynamicBinding {

	static class Person {
		public void speak() {
			System.out.println("Person speaks");
		}
	}

	static class Teacher extends Person {
		@Override
		public void speak() {
			System.out.println("Teacher speaks");
		}
	}

	public static void main(String args[]) {
		// Reference and objects are of Person type.
		Person obj2 = new Person();
		obj2.speak();
		// Reference is of Person type and object is Teacher type
		Person obj = new Teacher();
		obj.speak();
	}

}
