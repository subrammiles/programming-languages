package basics.e_strings.mutable_clases;

public class D_StringBuilder {


    static String joinWordsWithString(String[] words) {

        String sentance = "";
        for (String w : words) {
            sentance = sentance + w;
        }
        return sentance;
        /*On each concatenation a new copy of string is created and the two string are copied over.*/
        /*So this is not a efficient*/
        //O(n^2)

    }

    static String joinWordsWithStringBuilder(String[] words) {
        ///This creates  a re sizebaul array of strings
        final StringBuilder builder = new StringBuilder();
        for (String w : words) {
            builder.append(w);
        }
        return builder.toString();

    }

    static void append(){
        StringBuilder sb=new StringBuilder();
        sb.append("Welcome");
        sb.append(" Subbu");
        System.out.println(sb.toString());

    }


    public static void main(String[] args) {

        append();

        String s1 = joinWordsWithString(new String[] { "A", "P", "P", "L", "E" });
        System.out.println(s1);

        String s2=joinWordsWithStringBuilder(new String[] {"B","AT"});
        System.out.println(s2);

    }


}
