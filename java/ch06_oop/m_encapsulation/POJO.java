package b_oops.encapsulation;

/*
 A Java class which is a fully encapsulated class. 
  It has a private data member and getter and setter methods. 
 * */
public class POJO {

	public static class Student {
		/* private data member */
		private String name;

		/* getter and setter method for name */
		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}

	public static void main(String[] args) {
		Student s = new Student();
		s.setName("Subbu");
		System.out.println(s.getName());
	}

}
