package oops.e_abstraction;

 abstract  class WebConnectionAbstraction{
    abstract  void connect();
    abstract  void  close();
}
 class MyAbstractionTestClass extends WebConnectionAbstraction {
    @Override
    void connect() {

    }

    @Override
    void close() {

    }
}
public class B_AbstractClass {

     public static void useTheAbstractClass(){
        MyAbstractionTestClass myAbstractionTestClass=new MyAbstractionTestClass();
        myAbstractionTestClass.connect();
        ///Do the web requests
        myAbstractionTestClass.close();
    }

    public static void annonymousClass(){
        /*You can also use Anonymous class for crearting a class */
        WebConnectionAbstraction webConnectionAbstraction=new WebConnectionAbstraction() {
            @Override
            void connect() {

            }

            @Override
            void close() {

            }
        };

        webConnectionAbstraction.connect();
        //Do your operations
        webConnectionAbstraction.close();
    }

  public static void main(String[] args){





  }

}
