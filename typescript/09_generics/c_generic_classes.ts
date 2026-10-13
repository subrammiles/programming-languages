class MyGenericClass<T>{
    private _value: T|undefined;

    constructor(private name:string){

    }
    printData(){
        if(this._value){
         console.log("Yes")
        }else{
            console.log("No")
        }
    }
}

let myg1=new MyGenericClass<number>("subbu");
myg1.printData()