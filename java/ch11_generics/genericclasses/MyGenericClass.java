package c_advanced.e_generics.genericclasses;

public class MyGenericClass<T> {
	MyGenericClass(T myData){
		if(myData instanceof Integer ) {
			System.out.println("Integer is Passed");
		}else if(myData instanceof String) {
			System.out.println("String is Passed");
		}
	}
}
