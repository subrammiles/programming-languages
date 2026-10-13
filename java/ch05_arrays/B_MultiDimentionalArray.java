package basics.f_arrays;

import java.lang.reflect.Array;
import java.util.Arrays;

public class B_MultiDimentionalArray {

    
    public static void main(String[] args){
        int[][] a=new int[2][2];
        a[0][0]=455;
        a[0][1]=220;
        a[1][0]=33;
        a[1][1]=100;
        System.out.println(Arrays.toString(a));
        int[][] b=new int[][]{{1,2},{4,5}};
        System.out.println(Arrays.toString(b));
    }

}
