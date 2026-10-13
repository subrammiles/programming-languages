package oops.f_interfaces;

public class C_InterfaceInAnotherInterface {

    interface  MyOuterInterface{

        interface InnerInterface{
            void start();
        }
    }

    public static class MyClass implements MyOuterInterface.InnerInterface{

        @Override
        public void start() {
            System.out.println("Started.......");
        }
    }

    public static void main(String[] args){
        MyClass myClass=new MyClass();
        myClass.start();


    }


}
