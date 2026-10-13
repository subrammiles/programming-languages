'use strict'

class Vehicle{
    constructor(){

    }
    stop() {
        console.log("Vehicale stoped")
    }
    start() {
        console.log("Vehicale started")
    }
}


class Car extends Vehicle{
    constructor(){
        super();
    }
    stop() {
       super.stop();
    }
    start() {
        super.start()
    }
}

var car=new Car();
car.start();
car.stop();