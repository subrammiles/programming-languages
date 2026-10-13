package a_basics.strings.stringbufferandbuiulder;

/*
 
 String is immutable(we can not change the chanrters in string) whereas StringBuffer and StringBuilder are mutable classes.
StringBuffer is thread-safe and synchronized whereas StringBuilder is not. That’s why StringBuilder is faster than StringBuffer.
String concatenation operator (+) internally uses StringBuffer or StringBuilder class.
For String manipulations in a non-multi threaded environment, we should use StringBuilder else use StringBuffer class.
 * */
public class StringBuilderExample {

	static String joinWordsWithString(String[] words) {

		String sentance = "";
		for (String w : words) {
			sentance = sentance + w;
		}
		return sentance;
		/*On each concatenation a new copy of string is created and the two string are copied over.*/
		/*So this is not a efficient*/
		//O(n^2)

	}

	static String joinWordsWithStringBuilder(String[] words) {
		///This creates  a re sizebaul array of strings
		final StringBuilder builder = new StringBuilder();
		for (String w : words) {
			builder.append(w);
		}
		return builder.toString();

	}

	public static void main(String[] args) {

		String s1 = joinWordsWithString(new String[] { "A", "P", "P", "L", "E" });
		System.out.println(s1);
		
		String s2=joinWordsWithStringBuilder(new String[] {"B","AT"});
		System.out.println(s2);

	}

}
