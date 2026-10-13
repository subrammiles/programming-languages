package oops.f_interfaces.functional_interfaces;

public class C_FILambdaExpresssion {


    @FunctionalInterface
    interface MakeAPhoneCall {
        void callNow(int phoneNumber);
    }

    public static void main(String[] args) {

        //Anonymous new MakeAPhoneCall() can be replaced with lambda

//        MakeAPhoneCall call = new MakeAPhoneCall() {
//            public void callNow(int phoneNumber) {
//                System.out.println("I am in Test 2 interface");
//
//            }
//        };

        /* We can directly create an object imaplemt the class body */
      MakeAPhoneCall call = (phoneNumber) -> System.out.println("I am in Test 2 interface");
        call.callNow(0);

    }
}
