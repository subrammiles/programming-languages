package oops.b_inhertience;

/*
A class can extends only 1 class.
Java does not supports Multiple Inheritance
* */
public class C_MultipleInheritance {

    //Both class A and Class B contains method "msg()"

    static class A {
        void msg() {
            System.out.println("Hello Bro!!!");
        }
    }

    static class B {
        void msg() {
            System.out.println("Whatsup Bro!!!!");
        }
    }


//	static class C extends A,B{
//        //suppose if Java supports  multiple inheritance
//
//		public  void test() {
//			C obj = new C();
//			obj.msg();// Now which msg() method would be invoked?
//		}
//	}
}
