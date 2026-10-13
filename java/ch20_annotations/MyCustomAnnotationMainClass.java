package c_advanced.annotations;

public class MyCustomAnnotationMainClass {
	@interface MyCustomAnnotation {
		String value() default "default value";
	}

	@MyCustomAnnotation(value = "programiz")
	public void method1() {
		System.out.println("Test method 1");
	}

	public static void main(String[] args) throws Exception {
		MyCustomAnnotationMainClass obj = new MyCustomAnnotationMainClass();
		obj.method1();
	}
}
