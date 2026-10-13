package oops.d_consructor;

public class D_UsingTheParmsValueInClass {


    private static class  Calculator{

        int a;
        int b;

        Calculator(int a,int b){
            /*"this.a" represents the class variable "a" and
            "a" represents the constructor parm */
           this.a=a;
           this.b=b;
           /*We are taking the constructor parms and assigning them to the class
            parms */
     }

     int sum(){

            return a+b;
     }


     int multiplication(){

            return  a*b;
     }

    }

    public  static void main(String[] args){
      Calculator calculator=new Calculator(6,2);
        System.out.println(calculator.sum());
        System.out.println(calculator.multiplication());
    }

}
