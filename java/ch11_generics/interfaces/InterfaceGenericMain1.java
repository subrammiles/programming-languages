package c_advanced.e_generics.interfaces;

public class InterfaceGenericMain1 implements Interface1 {

	public static void main(String[] args) {

		InterfaceGenericMain1 obj = new InterfaceGenericMain1();
		obj.method1(1);
		obj.method1("Subbu");

	}

	@Override
	public void method1(Object data) {

		System.out.println(data);
	}

}
