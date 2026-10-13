package oops.f_interfaces;


/*A class can implements only the public interfaces but not other
 By default ,interfaces are public
* */

interface MyPublicInterface{
    /*This interface is public even though we did't added
    the public keyword
    * */
    void sum(int a,int b);


}

//protected interface MyPrivateInterface{
//    void sum(int a,int b);
//
//
//}


public class D_InterfaceShouldBePublic {

    class MyClass1 implements  MyPublicInterface{
        @Override
        public void sum(int a, int b) {

        }
    }

//    class MyClass2 implements  MyPrivateInterface{
//        @Override
//        public void sum(int a, int b) {
//
//        }
//    }

    public static void main(String[] args){}





}
