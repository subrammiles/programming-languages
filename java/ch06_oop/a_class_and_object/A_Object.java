package oops.a_class_and_object;

public class A_Object {
    //class defining a class
    static class Addition{
        int addTwoNumbers(int a ,int b){
            return a+b;
        }
    }

    public static void main(String[] args){
        Addition additionObject=new Addition();
        /*We create an object.Now we can call addTwoNumbers method with the object reference */
        int sum=additionObject.addTwoNumbers(2,3);
        System.out.println(sum);
    }


}
