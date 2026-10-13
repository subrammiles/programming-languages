package a_basics.c_exceptionhandling;


import java.io.*;
public class TryWithResources {
	public static void main(String[] args) {
	    String line;
	    try(BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
	      while ((line = br.readLine()) != null) {
	        System.out.println("Line =>"+line);
	      }
	    } catch (IOException e) {
	      System.out.println("IOException in try block =>" + e.getMessage());
	    }
	  }
}
