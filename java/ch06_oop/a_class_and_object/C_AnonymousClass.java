package oops.a_class_and_object;

public class C_AnonymousClass {

    static class Addition{
        void addTwoNumbers(int a ,int b){
            System.out.println("Add  2numbers :Method 1");
        }
    }

    public static void main(String[] args){
        Addition addition=new Addition(){
            public void addTwoNumbers(int a ,int b){
                /*This methods overrides the parent class*/
                System.out.println("Add  2numbers :Method 2");
            }
        };

        addition.addTwoNumbers(2,3);


    }
}
