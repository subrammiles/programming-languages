package oops.b_inhertience;

public class A_Inhertience {

    static class Animal{
     public void drinksWater(){
         System.out.println("All animals drinks water");
     }
    }

    static class Tiger extends Animal{
        public void typeOfAnimal(){
            System.out.println("I am a Tiger");
        }

    }

    static class Elephant extends Animal{
        public void typeOfAnimal(){
            System.out.println("I am an Elephent");
        }
    }

    public static void main(String[] args){
        Tiger t=new Tiger();
        t.drinksWater();
        t.typeOfAnimal();
        Elephant e=new Elephant();
        e.drinksWater();
        e.typeOfAnimal();

    }





}
