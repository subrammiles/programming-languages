package oops.d_consructor;

public class C_ConstructorWithParms {


    private static class  Calculator{

        Calculator(int a,int b){
            System.out.println(a+b);
        }


    }

    public  static void main(String[] args){
        Calculator calculator=new Calculator(1,2);
    }



}
