package oops.f_interfaces;


/* interface is abstract; cannot be instantiated*/
public class F_InterfaceObject {

    interface MySimpletInterface{
        void sum(int a,int b);
        /*Interface should not have body*/
    }
    class MyTestClass implements MyFirstInterface {

        @Override
        public void sum(int a, int b) {

        }

        @Override
        public void multiplication(int a, int b) {

        }
    }


    public void main(String[] args){
        MySimpletInterface myFirstInterfaceClass;
        /*You can create a variable of type MySimpletInterface */
       // myFirstInterfaceClass=new MySimpletInterface();
        // MySimpletInterface is abstract; cannot be instantiated



       // MySimpletInterface myFirstInterfaceClass2 =new MyTestClass();

    }
}
