package oops.f_interfaces;



/*
 1.Another feature that was added in JDK 8 is that
 we can now define static methods in interfaces
 that can be called independently without an object.
 2.Note: these methods are not inherited.
 * */

interface StaticFieldInterface
{
    final int a = 10;
    static void display()
    {
        System.out.println("hello");
    }
    void display2();
}
public class E_StaticFieldInterface implements StaticFieldInterface  {


    @Override
    public void display2() {

    }

    public static void main (String[] args)
    {
        StaticFieldInterface.display();
    }
}
