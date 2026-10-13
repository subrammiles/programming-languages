

/*The yield operator is used to pause and resume a generator function. */
function* getSeqOfEvenNumbers(){
    yield 2;
}
console.log(typeof getSeqOfEvenNumbers ) //function

let result=getSeqOfEvenNumbers();
//getSeqOfEvenNumbers  produce first even number 2
console.log(result.next());
//{value: 2, done: false} //false indicate that getSeqOfEvenNumbers may give you next number
//or it may not

