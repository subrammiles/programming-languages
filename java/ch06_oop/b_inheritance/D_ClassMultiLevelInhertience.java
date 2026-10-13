package oops.b_inhertience;

public class D_ClassMultiLevelInhertience {

    static class A{
        public static void method1() {
            System.out.println("I am method1");
        }
    }

    static class B extends A{
        public static void method2() {
            System.out.println("I am method2");
        }
    }

    static class C extends B{
        public static void method3() {
            System.out.println("I am method3");
        }
    }

    static class D extends  C{
        public static void method4() {
            System.out.println("I am method4");
        }
    }


    public static    void main(String[] args) {
        D d=new D();
        d.method4();
        d.method3();
        d.method2();
        d.method1();
    }

}
