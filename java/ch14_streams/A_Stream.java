package c_advanced.java8streams;

import java.util.Arrays;
import java.util.stream.Stream;

public class A_Stream {
	
	static Integer[] numbers = new Integer[]{1, 0, 3,4};
	
	static void streamtest1() {
		Stream<Integer>  numbersStream = Arrays.stream(numbers);
		Long count=numbersStream.count();
		System.out.println(count);
	}
	
	static void streamtest2() {
		Stream<Integer>  numbersStream = Arrays.stream(numbers);
		Long count=numbersStream.count();
		Long count2=numbersStream.count();
		System.out.println(count);
		System.out.println(count2);
		/*you can use only 1 operation*/
		/*Exception occurs when you use twice*/
		
	}
	
	
	static void streamtest3() {
		Stream<Integer>  numbersStream = Arrays.stream(numbers);
		Stream<Integer>  sortedStream=numbersStream.sorted();
		Integer[] sortedArray = sortedStream.toArray(Integer[]::new);
		// method reference operator <Class name>::<method name> 
		System.out.println(Arrays.toString(sortedArray));
	}

	public static void main(String[] args) {
		streamtest1();
		//streamtest2();
		streamtest3();
	}

}
