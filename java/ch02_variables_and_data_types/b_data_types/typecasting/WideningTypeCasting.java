package ch02_variables_and_data_types.b_data_types.typecasting;

public class WideningTypeCasting {


    public static void intToDouble(){
        int myInt=3;
        double myDouble1=myInt; /*Automatic type casting:int to double*/
        System.out.println(myDouble1); //3.0
        double myDouble2=Double.parseDouble("2"); /*Automatic type casting:int to double*/
        System.out.println(myDouble2); //3.0
    }


    public static void main(String[] args){
        intToDouble();
    }

}
