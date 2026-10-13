package e_threads.b_thread_methods;

/*
 Without Join method,Main method won't wait for the other thread.
 We will call join() method inside the main method through Thread t. 
 The main method will wait for thread that we create  until it completes execution. 

 * */

class CheckEvenNumber extends Thread{
	//This class adds 10 to the given number
	Integer number;
	public CheckEvenNumber(Integer number){
		this.number=number;
	}
	@Override
	public void run() {
		System.out.println("Child thread is running");
		boolean isEven=number%2==0?true:false;
		System.out.println(isEven);
		System.out.println("Child thread ends");
	}
}
public class Join {
	public static void main(String[] args) {
		CheckEvenNumber t=new CheckEvenNumber(91);
		t.start(); // thread t is ready to run.
		try {
			t.join(); // Wait for thread t to end.
		} catch (InterruptedException ie) {
			ie.printStackTrace();
		}
		System.out.println("Main Thread  ends");
	}
}