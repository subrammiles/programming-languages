package basics.e_strings.mutable_clases;


import java.util.GregorianCalendar;

/*
StringBuffer is synchronized i.e. thread safe.
It means two threads can't call the methods of StringBuffer simultaneously.
StringBuffer is less efficient than StringBuilder.
* */
public class B_StringBufferVsBuilder {

    public static void main(String[] args) {
        System.gc();
        long start=new GregorianCalendar().getTimeInMillis();
        long startMemory=Runtime.getRuntime().freeMemory();
        //StringBuffer sb = new StringBuffer();
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i<10000000; i++){
            sb.append(":").append(i);
        }
        long end=new GregorianCalendar().getTimeInMillis();
        long endMemory=Runtime.getRuntime().freeMemory();
        System.out.println("Time Taken:"+(end-start));
        System.out.println("Memory used:"+(startMemory-endMemory));
    }
}

/*
 Run the same code for the StringBuffer object also 5 to 6 trails to check the time and memory values.
* */

/*
Time:
SBuffer    386 400 529  360
SBuilder   379 437 412 402

* */