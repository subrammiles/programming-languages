package oops.c_method_overloading;

public class C_AmbigityWithOverloading {


    static void add(int a, long b) {
       System.out.print("Method 1 is invoked");
    }

    static void add(long a, int b) {
        System.out.print("Method 1 is invoked");
    }



    public static void main(String[] args) {
        //Compiler don't know which method it should take.
        // 2 is promoted to long automatically .So it don't know which method to use
     //  add(2,2);
        //This gives an error Ambiguous method call.
        //So you need to handle this carefully

        /*Solution 1*/
        add(2,2L);
        /*Solution 2*/
        //You need to modify the method defination

    }
}
