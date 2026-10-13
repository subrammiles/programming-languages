
function* getSeqOfEvenNumbers(){
    yield 2;
    yield 4;
    yield 6;
}

let result=getSeqOfEvenNumbers();

console.log(result.next());//we consumed 2,done=false because still it generates
console.log(result.next());//we consumed 4,done=false because still it generates
console.log(result.next());//we consumed 6,done=false because still it generates
console.log(result.next());//we consumed all ,done=true because  generates stops
