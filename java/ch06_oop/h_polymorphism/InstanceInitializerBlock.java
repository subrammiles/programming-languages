package b_oops.Polymorphism;

public class InstanceInitializerBlock {

	static class Bike {
		int speed = 100;
		double distance;

		/* This is the instance inialize block */
		{
			distance = 200;
		}

		public void getTimeToReach() {
			System.out.println(distance / speed);
		}

	}

	static class Bus {
		int speed = 100;
		double distance;

		/* instance inialize block called before constracture */
		{
			System.out.println("Initializationg the bus speed");
			distance = 200;
		}

		Bus() {
			System.out.println("Bus const called");
		}

		public void getTimeToReach() {
			System.out.println(distance / speed);
		}

	}

	public static void main(String[] args) {
		Bike test1 = new Bike();
		test1.getTimeToReach();

		Bus test2 = new Bus();
		test2.getTimeToReach();

	}

}
