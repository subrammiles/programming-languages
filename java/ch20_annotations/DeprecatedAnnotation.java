package c_advanced.annotations;

public class DeprecatedAnnotation {
	   /**
	   * @deprecated
	   * This method is deprecated and has been replaced by newMethod()
	   */
	  @Deprecated
	  public static void deprecatedMethod() { 
	    System.out.println("Deprecated method"); 
	  } 

	  public static void main(String args[]) {
	    deprecatedMethod();
	  }
}
