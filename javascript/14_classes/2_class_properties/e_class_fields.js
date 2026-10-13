
/*fileds are not added to prototypes
but methods are added
*/
class Animal{
    animalName="Dog";
    getTheAnimalName(){
        console.log(`I am a ${this,this.animalName}`)
    }
}

let animal=new Animal();
animal.getTheAnimalName();
console.log(Animal.prototype)
console.log(Animal.prototype.getTheAnimalName)//It will be defined
console.log(Animal.prototype.constructor) //It will be defined
console.log(Animal.prototype.animalName) //undefined