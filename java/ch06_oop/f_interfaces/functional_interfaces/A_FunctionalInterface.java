package oops.f_interfaces.functional_interfaces;


/*
 1.A functional interface is an interface that contains only one abstract method.
 2.They can have only one functionality to exhibit.
 eg: Runnable, ActionListener, Comparable
 * */

@FunctionalInterface
interface MakeAPhoneCall {
    void call(int phoneNumber);
}
/* If you add another method ,it will throw an error */

public class A_FunctionalInterface {

    static class Test1 implements MakeAPhoneCall {

        @Override
        public void call(int phoneNumber) {
            System.out.println("I am in Test 1 interface");

        }

    }

    public static void main(String[] args) {
        MakeAPhoneCall call1 = new Test1();
        call1.call(0);

    }

}
