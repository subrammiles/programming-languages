package oops.c_method_overloading;


/*Method overloading by changing datatype of argument*/
public class A_DiffrentArguments {

    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static long add(long a,long b){
        return a+b;
    }

    public static void main(String[] args) {
        System.out.println(add(11, 11));
        System.out.println(add(12.3, 12.6));
        System.out.println(add(12888888888888888L, 455555555555L));
    }
}
