package c_advanced.e_generics.genericclasses;

public class MyGenericMain2 {

	static class C1<U> {
		C1(U data) {
			if (data instanceof Integer) {
				System.out.println(data);
			}
		}
	}

	static class C2<U, V> {
		C2(U data, V data2) {
			Integer i = (Integer) data;
			Integer i2 = (Integer) data2;
			System.out.println(i + i2);
		}
	}

	public static void main(String[] args) {

		C1 c1 = new C1(2);
		C2 c2 = new C2(2, 4);

	}

}
