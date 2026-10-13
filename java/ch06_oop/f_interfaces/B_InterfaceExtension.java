package oops.f_interfaces;


/*Interface can extends n number of interfaces*/
public class B_InterfaceExtension {

    public interface Interface1 {
        void method1();
    }

    public interface Interface2 {
        void method2();
    }

    public interface Interface3 extends Interface1 {
        void method3();
    }

    public interface Interface4 extends Interface1, Interface2, Interface3 {
        void method4();
    }

    public class MyClass implements Interface1, Interface2 {
        /*A class cam implemets muliple interfaces too*/

        @Override
        public void method2() {
            // TODO Auto-generated method stub

        }

        @Override
        public void method1() {
            // TODO Auto-generated method stub

        }

    }


}
