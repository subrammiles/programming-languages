package oops.a_class_and_object;

public class B_AnonymousObject {

    //class defining a class
    static class Addition{
        int addTwoNumbers(int a ,int b){
            return a+b;
        }
    }

    public static void main(String[] args){
        /*new Addition() will create an anonymous object but
         we are not storing that object  to a new avriable.
         We are calling the method directly.
        * */
        int sum=new Addition().addTwoNumbers(2,3);
        System.out.println(sum);
    }

}
