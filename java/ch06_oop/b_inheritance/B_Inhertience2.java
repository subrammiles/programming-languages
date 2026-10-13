package oops.b_inhertience;

public class B_Inhertience2 {


    static class Animal{
        public void drinksWater(){
            System.out.println("All animals drinks water");
        }
    }

    static class Tiger extends Animal {
        public void typeOfAnimal(){
            System.out.println("I am a Tiger");
        }

    }

    static class Elephant extends Animal {
        public void typeOfAnimal(){
            System.out.println("I am an Elephent");
        }
    }

    public static void main(String[] args){

        Animal animal=new Animal();
        animal.drinksWater();

        //Here Reference and Object are of Animal Type

        //As Animal is a parent class for the children Tiger and Elephant
        //You can assign Child class to Parent
        //Here Reference is Animal type and Object is of Tiger type
        Animal t=new Tiger();
        t.drinksWater();
        //t.typeOfAnimal();

        //You can not call animalType as it is property of child class.Parent class can not know the child
        //class properties
        Animal e=new Elephant();
        e.drinksWater();
        //e.typeOfAnimal();

    }


}
