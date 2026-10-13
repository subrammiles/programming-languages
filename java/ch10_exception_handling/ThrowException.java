package a_basics.c_exceptionhandling;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

/*
 Checked exceptions occur at compile time.
 Unchecked exceptions occur at runtime. 
  

 * */
public class ThrowException {

	static void throwingUncheckedException() {
		/*
		 * we have created a method named validate() that accepts an integer as a
		 * parameter. If the age is less than 18, we are throwing the
		 * ArithmeticException otherwise print a message welcome to vote.
		 */

		validate(18);

	}

	// function to check if person is eligible to vote or not
	public static void validate(int age) {
		if (age < 18) {
			// throw Arithmetic exception if not eligible to vote
			throw new ArithmeticException("Person is not eligible to vote");
		} else {
			System.out.println("Person is eligible to vote!!");
		}
	}

	static void dummyMethod() {
		System.out.println("Dummy Message");
	}

	// function to check if person is eligible to vote or not
	public static void method() throws FileNotFoundException {

		FileReader file = new FileReader("C:\\Users\\Anurati\\Desktop\\abc.txt");
		BufferedReader fileInput = new BufferedReader(file);

		throw new FileNotFoundException();

	}

	// main method
	public static void checkedException(String args[]) {
		try {
			method();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("rest of the code...");
	}

	public static void main(String[] args) {

		throwingUncheckedException();
		dummyMethod();

	}

}
