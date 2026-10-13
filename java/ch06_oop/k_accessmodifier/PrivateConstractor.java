package oops.k_accessmodifier;

/*If you make any class constructor private, you cannot create the instance of that class from outside the class.*/


class PrivateConstractorClass {
	private PrivateConstractorClass() {
	}
}

public class PrivateConstractor {

	public static void main(String args[]) {
		//PrivateConstractorClass obj = new PrivateConstractorClass();// Compile Time Error
		//The constructor PrivateConstractorClass() is not visible
		//we made the constractor private.So it is not visible to create an object
	}
	
}
