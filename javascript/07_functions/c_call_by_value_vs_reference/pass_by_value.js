/*Pass by value */
function change(b){
    /*b is a copy of a */
    b=2;
}
var a=1;
change(a);
console.log(a); //prints 1
/*Remember primitive (int,string,bool) are  paased by values  */
