package e_threads.synchronization.trainticket;

/*
 RACE CONDITION PROBLEM : 1 ticket was booked by 2 passengers.
 * */
class TicketBooking implements Runnable {
	int ticketsAvailable = 1;

	@Override
	public void run() {
		System.out.println("New Passenger entered  to book ticket  : " + Thread.currentThread().getName());
		bookTicket();
	}

	public void bookTicket() {
		
		if (ticketsAvailable > 0) {
			System.out.println("Booking ticket for : " + Thread.currentThread().getName());

			// Let's say system takes some time in booking ticket (here we have taken 1
			// second time)
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
			}

			ticketsAvailable--;
			System.out.println("Ticket BOOKED for : " + Thread.currentThread().getName());
			System.out.println("currently ticketsAvailable = " + ticketsAvailable);
		} else {
			System.out.println("Ticket NOT BOOKED for : " + Thread.currentThread().getName());
		}

	}

	public static void main(String args[]) {
		TicketBooking obj = new TicketBooking();
		System.out.println("Current Available Ticket count = " + obj.ticketsAvailable);

		Thread thread1 = new Thread(obj, "Passenger1:Trump");
		Thread thread2 = new Thread(obj, "Passenger2:Obama");

		thread1.start();
		thread2.start();

	}

}

/*
 * first Passenger1 Thread and Passenger2 Thread waited to book tickets. Than,
 * both threads tried to check the available ticket count and it was 1. Both
 * threads were able to book ticket. And ultimately available ticket was reduced
 * to -1, which is practically impossible, tickets count can never  below 0.
 * 
 */
