package c_advanced.e_generics;

public class BoundedTypes {

	
	
public static void main(String args[]) {
		
		printDataType(5);
		printDataType(5.7);
		//Showing error because String and Integer won'r match
		//printDataType("I am string");
		
	}
	
	private static  <T extends Number> void  printDataType(T myData) {
		if(myData instanceof Integer){
			System.out.println("Integer entered");
		}	
	}

}
