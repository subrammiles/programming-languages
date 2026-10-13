package basics.e_strings.mutable_clases;

public class A_MutableClasses {


    public static void main(String[] args){
        /*StringBuffer*/
        StringBuffer buffer1=new StringBuffer("hello");
        buffer1.append("java");
        System.out.println(buffer1);

        /*StringBuilder*/
        StringBuilder builder=new StringBuilder("hello");
        builder.append("java");
        System.out.println(builder);

    }

}
