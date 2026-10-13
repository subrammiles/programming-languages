package oops.j_keywords.superkeyword;

/*
 We can call the parent fields or methods using super keyword
 * */


public class SuperKeyword {

	static class BasicPay {
	     int salary = 2000;
	}

	static class EmpolyeeTotalSalary extends BasicPay {
		  int salary = 4000;
		  
		  public int getSalary(boolean addBonus) {
			  if(addBonus) {
				  return salary; 
			  }else {
				  return super.salary;
			  }	
		  }
	}

	public static void main(String[] args) {

		EmpolyeeTotalSalary sarary=new EmpolyeeTotalSalary();
		
		int salary=sarary.getSalary(true);
		System.out.println(salary);
		
		int salaryNoBonus=sarary.getSalary(false);
		System.out.println(salaryNoBonus);
		
	}

}
