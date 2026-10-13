package oops.f_interfaces.functional_interfaces;

public class B_AnonymousFI {

    @FunctionalInterface
    interface MakeAPhoneCall {
        void callNow(int phoneNumber);
    }

    public static void main(String[] args) {

        /* We can directly create an object imaplemt the class body */
        MakeAPhoneCall call = new MakeAPhoneCall() {
            public void callNow(int phoneNumber) {
                System.out.println("I am in Test 2 interface");

            }
        };
        call.callNow(0);

    }

}
