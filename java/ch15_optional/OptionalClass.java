package f_other.optionlaclasses;

import java.util.Optional;

/*Optional is a container object used to contain not-null objects.*/
public class OptionalClass {

	public static void test1() {
		/*This give null point exception*/
		String[] str = new String[10];
		String lowercaseString = str[5].toLowerCase();
		System.out.print(lowercaseString);
	}

	public static void main(String args[]) {

		Integer v1 = null;
		Integer v2 = Integer.valueOf(10);

		// Optional.ofNullable - allows passed parameter to be null.
		Optional<Integer> op1 = Optional.ofNullable(v1);
		// Optional.of - throws NullPointerException if passed parameter is null
		Optional<Integer> op2 = Optional.of(v2);

		System.out.println(op1);
		System.out.println(op2);
		// Optional.orElse - returns the value if present otherwise returns
		// the default value passed.
		Integer p1 = op1.orElse(Integer.valueOf(0));
		// Optional.get - gets the value, value should be present
		Integer p2 = op2.get();

		System.out.println(p1);
		System.out.println(p2);
	}

}
