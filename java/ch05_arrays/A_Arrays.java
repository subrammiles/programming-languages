public class A_Arrays {

	public static void method1() {
		int[] myArray1;
		myArray1=new int[2]; //we must specify the size
		
		int[] myArray2=new int[3];
		myArray2[0]=100;
		myArray2[1]=200;
		myArray2[2]=300;
		
		//Cannot define dimension expressions when an array initializer is provided
		
		//int[] myArray3=new int[3] {100,200,300};//You can not add data to array and size simutonously
		
          int[] myArray4=new int[] {250,350,450};
	}
	
	public static void method2() {
		int[] myArray=new int[] {250,350,450};
		System.out.print(myArray.length);
	}

	public static void main(String[] args) {
		method2();
	}

}
