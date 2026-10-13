package oops.f_interfaces.functional_interfaces.examples;

public class ThreadFI {

    public static void test1(){
        /*Using Lambda expression*/
        Thread thread= new Thread(()->{
            System.out.println("Lambda Test.....");
        });
        thread.start();

    }

    public static class MyRunnableClass implements Runnable{

        @Override
        public void run() {
            System.out.println("Runnable Test.....");
        }
    }

    public static void test2(){
        MyRunnableClass myRunnableClass=new MyRunnableClass();
        Thread t=new Thread(myRunnableClass);
        t.start();
    }


    public static void main(String[] args){

      test1();
      test2();
    }

}
