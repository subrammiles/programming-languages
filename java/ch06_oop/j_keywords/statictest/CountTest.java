package oops.j_keywords.statictest;

public class CountTest {
	
	//Remove static  keyword and check
	 //int counter = 0;
	static int counter = 0;
	 
    public CountTest() {
        counter++;
    }
 
    public void getCount() {
        System.out.println("Total number of CountTest instances so far: " + counter);
    }

}
