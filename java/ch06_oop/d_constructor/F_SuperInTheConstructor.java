package oops.d_consructor;



/*You can use super keyword to call the parent class
constructor from child class constructor
**/
public class F_SuperInTheConstructor {

    static class Print{
        Print(int number){
            System.out.println("Result is "+number);
        }

        Print(String msg,int number){
            System.out.println(msg+ " is "+number);
        }

    }

    static class MathOperation extends Print{

        MathOperation(int a,int b){
            super(a+b);
            /*This super will call the parent constructor Print(int number)*/
        }

    }

    public static void main(String[] args){
        MathOperation operation=new MathOperation(2,4);
    }


}
