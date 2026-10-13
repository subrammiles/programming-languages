//We no need to create instances of class.
//We can directly call
class Human{

}
Human.sex="Female";
Human.getHeartBeat=function getHeartBeat(){
    console.log("74")
}
console.log(Human.sex);
console.log(Human.getHeartBeat());

/*In a class declaration, they are prepended by static keyword 
and that makes them static */
class Human2{
    static sex="Female";
    static  getHeartBeat(){
        console.log("74")
    }
}
console.log(Human2.sex);
console.log(Human2.getHeartBeat());