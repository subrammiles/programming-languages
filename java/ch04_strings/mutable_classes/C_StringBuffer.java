package basics.e_strings.mutable_clases;

public class C_StringBuffer {


    static void append(){
        StringBuffer sb=new StringBuffer("Welcome");
        sb.append(" Subbu");
        /*To print ,you need to conver this to string */
        System.out.println(sb.toString());
    }

    static void reverse() {
        /* To reverse a given string */
        StringBuffer sb = new StringBuffer("Subbu");
        sb.reverse();// now original string is changed
        System.out.println(sb);
    }

    static void replace() {
        /*
         * replace() method replaces the given string from the specified beginIndex and
         * endIndex-1.
         */
        StringBuffer sb = new StringBuffer("123456789");
        sb.replace(2, 4, "Su");
        System.out.println(sb);
    }

    static void delete() {
        /*
         * The delete() method of StringBuffer class deletes the string from the
         * specified beginIndex to endIndex-1.
         */
        StringBuffer sb = new StringBuffer("123456789");
        sb.delete(1, 2);
        System.out.println(sb);
    }

    static void constructorsOfSB() {

        System.out.println("<<<<<<<<<<<<constructors>>>>>>>>.");
        StringBuffer s1 = new StringBuffer();
        StringBuffer s2 = new StringBuffer("Subbu");

        System.out.println(s1.toString());
        System.out.println(s2.toString());

        /* Initial capacity */
        StringBuffer s3 = new StringBuffer(2);
        s3.append("12345");
        System.out.println(s3.toString());

    }




    public static void main(String[] args){
        append();
    }

}
