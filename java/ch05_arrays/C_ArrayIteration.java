package basics.f_arrays;

import java.util.Arrays;

public class C_ArrayIteration {

   public static void  forLoop(){
       int[] a=new int[]{34,56,78,89};
       for(int i=0;i<a.length;i++){
           System.out.println(a[i]);
       }
   }

    public static void  enhancedForLoop(){
        int[] a=new int[]{34,56,78,89};
        /*Enhanced for loop*/
        /*Arrays are homogeneous.They accept only same data type
        Every element is a int in this case.
        int i :a
        * */
        for(int element:a){
            System.out.println(element);
        }
    }

    public static void iterationOf2DArray(){
        int[][] a=new int[][]{{100,200,300},{400,500,600}};
        int noOfRows=a.length;
        for (int[] row : a) {
            //In this for each ,element represent a row
            System.out.println(Arrays.toString(row));
        }
        for (int i=0;i<noOfRows;i++) {
            //a[i] is an array representing  i th row
              for(int j=0;j<a[i].length;j++){
                  System.out.print(a[i][j]);
                  System.out.print(" ");
              }
            System.out.println();
        }
    }


    public static void main(String[] args){
        //forLoop();
        //enhancedForLoop();
        iterationOf2DArray();
    }

}
