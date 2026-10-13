package oops.b_inhertience.method_overriding;

/*Both Parent and children contains the "eats()" method
Child class is taken preference.
In case if you want to call the parent class method,use super keyword
* */
public class B_SuperKeyword {

    static class Animal{
        public void eats(){
            System.out.println("All animals eats");
        }
    }

    static class Tiger extends A_WithoutMethodOverriding.Animal {
        public void eats(){
            System.out.println("Tiger is  carnivore it eats meat");
        }

    }

    static class Elephant extends A_WithoutMethodOverriding.Animal {
        public void eats(){
            super.eats();
            System.out.println("This line exutes after super call");
        }
    }

    public static void main(String[] args){


      Tiger t1=new Tiger();
        t1.eats();
        //Tiger is  carnivore it eats meat
      Elephant e1=new Elephant();
        e1.eats();
        //Elephent is a herbivore and eats plants




    }

}
