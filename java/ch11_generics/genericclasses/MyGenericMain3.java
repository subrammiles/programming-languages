package c_advanced.e_generics.genericclasses;

public class MyGenericMain3<T> {
	   T t;
	   public static void main(String[] args) {
		   MyGenericMain3 obj=new MyGenericMain3();
		   obj.t="Subbu";
		   System.out.println(obj.t);
	   }
}
