package c_advanced.e_generics.wildcard;

import java.util.ArrayList;
import java.util.List;

public class UpperBoundedWildcard {
	
	public static double sum1(List<Number> list){
		double sum = 0;
		for(Number n : list){
			sum += n.doubleValue();
		}
		return sum;
	}
	public static double sum2(List<? extends Number> list){
		double sum = 0;
		for(Number n : list){
			sum += n.doubleValue();
		}
		return sum;
	}
	public static void main(String[] a) {
		List<Double> myList= new ArrayList<Double>();
		myList.add(1.2);
		myList.add(2.3);
		//double result=sum1(myList);
		double result=sum2(myList);
	}

}
