package c_advanced.reflectionAPI;

/*
 Java Reflection is a process of examining or modifying the run time behavior of a class at run time.

The java.lang.Class class provides many methods that can be used to get metadata, examine and change the run time behavior of a class. 

 * */
public class JavaReflectionAPI {

	static class Simple {
	}

	public static void forName() throws Exception {
		/*
		 * s used to load the class dynamically. returns the instance of Class class. It
		 * should be used if you know the fully qualified name of class.This cannot be
		 * used for primitive types.
		 * 
		 */
		Class c = Class.forName("Simple");
		System.out.println(c.getName());
	}

	void printName(Object obj) {
		Class c = obj.getClass();
		System.out.println(c.getName());
	}

	public static void getClassTest() {
		/*
		 * It returns the instance of Class class. It should be used if you know the
		 * type. Moreover, it can be used with primitives.
		 * 
		 */
		Simple s = new Simple();
		JavaReflectionAPI javaReflectionAPI = new JavaReflectionAPI();

		javaReflectionAPI.printName(s);
	}

	public static void main(String args[]) throws Exception {

		forName();
		getClassTest();

	}

}
