package b_oops.Polymorphism;

public class CovariantReturnType {
	
	static class Food{
		Food(){
			System.out.println("Common Food");
		}
	}
	
//	static class DogFood extends Food {
//		/*If DogFood does npt extends the Food ,serverFood throws an error*/
//		DogFood(){
//			System.out.println("Dog Food");
//		}
//	}
	
	static class DogFood {
		/*If DogFood does npt extends the Food ,serverFood throws an error*/
		DogFood(){
			System.out.println("Dog Food");
		}
	}
	
	static class CatFood{
		CatFood(){
			System.out.println("Cat Food");
		}
	}
	
	public class Animal {

	    protected Food serveFood() {

	        return new Food();
	    }
	}
	
//	public class Dog extends Animal {
//
//	    @Override
//	    protected Food serveFood() {
//
//	        return new DogFood();
//	    }
//	}
	

}
