package oops.b_inhertience.method_overriding;

public class C_SuperWithMethodParam {


    static class Animal{
        public void eats(String animal){
            System.out.println(animal+" eats");
        }
    }

    static class Carnivore extends Animal {
        public void eats(String animal){
            super.eats(animal);
        }

    }

    static class Herbivorous extends Animal {
        public void eats(String animal){
            System.out.println(animal +" eats Plants");
        }
    }

    public static void main(String[] args){

        Carnivore t1=new Carnivore();
        t1.eats("Tiger");
        //Tiger eats
        Herbivorous e1=new Herbivorous();
        e1.eats("Elephent");
        //Elephent eats Plants

    }

}
