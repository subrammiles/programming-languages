package oops.j_keywords.thisKeyword;

/*
 Let's prove that this keyword refers to the current class instance variable. 
 In this program, we are printing the reference variable and this, output of both variables are same.
 * */
public class ProvingThisKeyword {
	void m() {
		System.out.println(this);// prints same reference ID
	}

	public static void main(String args[]) {
		ProvingThisKeyword obj = new ProvingThisKeyword();
		System.out.println(obj);// prints the reference ID
		obj.m();
	}

}

