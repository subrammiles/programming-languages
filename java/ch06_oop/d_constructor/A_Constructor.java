package oops.d_consructor;

public class A_Constructor {

    static class MyClass1{
        /*Every class as a default Constructor
        event if you don't declare explicitly*/
    }

    static class MyClass2{
        MyClass2(){
              /*We are  adding default Constructor
         explicitly*/
         /* Constructor should not have a return type and same name as the class*/
        }

    }

    public static void main(String[] args){
        MyClass1 myClass1=new MyClass1();
        MyClass2 myClass2=new MyClass2();


    }


}
