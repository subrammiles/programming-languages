package basics.e_strings;


/*
String objects are immutable (unmodifiable or unchangeable)
Once String object is created its data or state can't be changed but a new String object is created.
* */
public class C_StringImmutable {

    public static void main(String[] args){
        String s1="Subbu";
        s1.concat(" Pampana");//concat() method appends the string at the end
        System.out.println(s1);//will print Subbu because strings are immutable objects

        String s2="Subbu";
        s2=s2.concat(" Pampana");//concat() method appends the string at the end
        System.out.println(s2);// Subbu Pampana
        /*This will discord the old string "subbu" and assigns a new string "Subbu Pampana" */
    }



}
