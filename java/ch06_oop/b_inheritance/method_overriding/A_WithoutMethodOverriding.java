package oops.b_inhertience.method_overriding;



/*Both Parent and children contains the "eats()" method
Child class is taken preference.
* */
public class A_WithoutMethodOverriding {

    static class Animal{
        public void eats(){
            System.out.println("All animals eats");
        }
    }

    static class Tiger extends Animal {
        public void eats(){
            System.out.println("Tiger is  carnivore it eats meat");
        }

    }

    static class Elephant extends Animal {
        /*You can add the Override keyword(optional) */
        @Override
        public void eats(){
            System.out.println("Elephent is a herbivore and eats plants");
        }
    }

    public static void main(String[] args){


        Tiger t1=new Tiger();
        t1.eats();
        //Tiger is  carnivore it eats meat
        Elephant e1=new Elephant();
        e1.eats();
        //Elephent is a herbivore and eats plants

        Animal t=new Tiger();


    }


}
