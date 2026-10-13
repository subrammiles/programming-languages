package basics.c_datatypes.typecasting;

public class NarrowingTypeCasting {

  public static void doubleToInt(){
      double myDouble=3.4;
      int myInt=(int) myDouble;
      System.out.println(myInt);
  }

    public static void stringToInt(){
        String s1="2";
        String s2="2.3";
        int myInt=Integer.parseInt(s1);
        System.out.println(myInt);
        try {
            int myInt2=Integer.parseInt(s2);
            System.out.println(myInt2);
        }catch (Exception e){
            /*java.lang.NumberFormatException*/
            System.out.println(e);
        }

    }


    public static void main(String[] args){
        doubleToInt();
        stringToInt();
    }

}
