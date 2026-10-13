let sumMixin={
    addTwoNumbers(a,b){
       console.log(a+b);
    },
    addThreeNumbers(a,b,c){
        console.log(a+b+c);
    }
}
class Operations{

}
Object.assign(Operations.prototype,sumMixin);

new Operations().addTwoNumbers(2,3);