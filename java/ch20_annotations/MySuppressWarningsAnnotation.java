package c_advanced.annotations;

public class MySuppressWarningsAnnotation {
	  @Deprecated
	  public static void deprecatedMethod() { 
	    System.out.println("Deprecated method"); 
	  } 
	  @SuppressWarnings("deprecated")
	  public static void main(String args[]) {
		  MySuppressWarningsAnnotation depObj = new MySuppressWarningsAnnotation();
	    depObj. deprecatedMethod();
	  }

}
