package basics.f_arrays;

public class A_Creating_Arrays {


  public static void withPredefinedSize(){
      /*We must use the new keyword*/
      int[] myArray=new int[3];

      int[] myArray2;
      myArray2=new int[3];
      myArray2[0]=34;

      //C style array declaration
      int myArray3[]=new int[3];


  }

    public static void withData(){
        /*We must use the new keyword*/
        int[] myArray=new int[]{100,200,300};

        //C style array declaration
        int myArray2[]=new int[]{100,200,300};

        //int[] myArray2=new int[3]{100,200,300};
        // //You can not add data to array and size simutonously
    }

    public static void main(String[] args){
        withPredefinedSize();
        withData();
    }

}
