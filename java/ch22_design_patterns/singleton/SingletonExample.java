package c_advanced.singleton;

public class SingletonExample {
	// private field that refers to the object
	   private static SingletonExample singleObject;

	   private SingletonExample() {
	      // constructor of the SingletonExample class
	   }

	   public static SingletonExample getInstance() {
		return singleObject;
	      // write code that allows us to create only one object
	      // access the object as per our need
	   }

}
