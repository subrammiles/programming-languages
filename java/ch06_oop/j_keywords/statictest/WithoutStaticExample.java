package oops.j_keywords.statictest;

public class WithoutStaticExample {

	static class Student {
		int rollno;// instance variable
		String name;
		static String college = "ITS";// static variable
		
		Student(int r, String n) {
			rollno = r;
			name = n;
		}

		void display() {
			System.out.println(rollno + " " + name + " " + college);
		}
	}

	public static void main(String args[]) {
		Student s1 = new Student(111, "Karan");
		Student s2 = new Student(222, "Aryan");
		// we can change the college of all objects by the single line of code
		// Student.college="BBDIT";
		s1.display();
		s2.display();
	}
}
