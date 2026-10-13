package b_oops.e_interfaceexamples.interfaceproperties;


/*
 
 
 the interface could not define the implementation. We can now add default implementation for interface methods. 
 This default implementation has a special use and does not affect the intention behind interfaces.
 
 * */
interface In1Static
{
   final int a = 10;
   static void display()
   {
       System.out.println("hello");
   }
   
}


public class DefaultInterface implements  In1Static {
	
	// Driver Code
    public static void main (String[] args)
    {
    	
    }  

}
