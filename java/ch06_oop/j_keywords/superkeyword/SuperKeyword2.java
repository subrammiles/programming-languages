package oops.j_keywords.superkeyword;



/*
We can call the parent fields or methods using super keyword
* */


public class SuperKeyword2 {

	static class BasicPay {
	     
	     public int getBasicSalary() {
			 return 1000;
		  }
	}

	static class EmpolyeeTotalSalary extends BasicPay {
		  
		  
		  public int getBasicSalary() {
			  return 2000;
		  }
		  
		  public int getSalary(boolean addBonus) {
			  if(addBonus) {
				  return getBasicSalary();
			  }else {
				  return super.getBasicSalary();
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
