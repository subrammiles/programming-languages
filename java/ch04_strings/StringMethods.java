package a_basics.strings;

public class StringMethods {
	
	static String s="Subbu";
	
	
	public static void stringLength() {
		
		System.out.println(s.length());//length() method gives the length
	}
	
	public static void charAt() {
		String s="Subbu";
		System.out.println(s.charAt(3));//length() method gives the length
	}
	
	public static void main(String[] args) {
		stringLength();
		charAt();
	}

}
