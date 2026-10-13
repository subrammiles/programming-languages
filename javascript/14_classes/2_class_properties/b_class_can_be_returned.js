
function getClass(){
    return class{
        eats(){
            console.log("Animals eats");
        }
    }
}

let Animal=getClass();
new Animal().eats()