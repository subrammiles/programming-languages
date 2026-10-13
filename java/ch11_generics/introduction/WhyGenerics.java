package c_advanced.e_generics.introduction;

import java.util.ArrayList;
import java.util.List;

public class WhyGenerics {
	
	
	
	public static void method1() {
		/*This list accepts all data types*/
		List list=new ArrayList();
	    list.add(1);//Adding Integer
	    list.add("Subbu");//Adding String
	    
	    ///Now print th eelements
	    for(Object obj:list) {
	    	///We are type casing the obj to string 
	    	//Obj can be a string ,Int or any other datat type
	    	String str=(String)obj;
	    	//Type casing fails if it not a String
	    }
	}
	

	public static void method2() {
		/*This list accepts all data types*/
		List<String> list=new ArrayList();
	    list.add("1");//Adding Integer
	    list.add("Subbu");//Adding String
	    
	    ///Now print th eelements
	    for(Object obj:list) {
	    	///We are type casing the obj to string 
	    	//Obj can be a string ,Int or any other datat type
	    	String str=(String)obj;
	    	//Type casing fails if it not a String
	    }
	}

	public static void main(String[] args) {
		/*If you run method1 .This throws an error*/
		//method1();
		method2();
		

	}

}
