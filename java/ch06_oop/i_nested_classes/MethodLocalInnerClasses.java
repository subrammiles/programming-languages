package oops.i_nested_classes;

public class MethodLocalInnerClasses {

	public static class OuterClass {
		int a=2;

		void outermethod() {

			class InnerClass {
				void innermethod() {
					System.out.println("Inner Method");
					System.out.println(a);
				}
			}
			InnerClass innerClass = new InnerClass();
			innerClass.innermethod();

		}

	}

	public static void main(String[] args) {
		OuterClass x = new OuterClass();
		x.outermethod();
	}

}
