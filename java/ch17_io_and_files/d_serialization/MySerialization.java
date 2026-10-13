package c_advanced.serializationexamples;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class MySerialization {

	public static void main(String arg[]) {
		Person p1 = new Person();
		p1.setAge(20);
		p1.setName("Joe");

		try {
			FileOutputStream fileOutputStream = new FileOutputStream("/Users/subbupeng/Documents/yourfile.txt");
			ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
			objectOutputStream.writeObject(p1);
			objectOutputStream.flush();
			objectOutputStream.close();

			FileInputStream fileInputStream = new FileInputStream("/Users/subbupeng/Documents/yourfile.txt");
			ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
			Person p2 = (Person) objectInputStream.readObject();
			objectInputStream.close();
			System.out.println(p2.getName());
			System.out.println(p2.getAge());

		} catch (Exception e) {
		}
	}

	public static class Person implements Serializable {
		private int age;
		private String name;

		public int getAge() {
			return age;
		}

		public void setAge(int age) {
			this.age = age;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}
	  
}
