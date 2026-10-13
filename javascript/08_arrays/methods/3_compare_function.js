/*
function(a, b){return a - b}
Result -ve=>  a is sorted before b.
Result is +ve=> b is sorted before a.
Result is 0 no changes are done .
*/

let points = [50, 10, 10,3,4,1,77,2,7,11];

points.sort((a,b)=>{
  if(a>b){
    return -1;
    //for -1 ,it puts a first
  }else{
    return 1;
  }
})
// points.sort((a,b)=>{
//   if(a%2==0){
//     return -1;
//   }
//   else if(b%2==0){
//     return 1;
//   }else{
//     return 0;
//   }
// }
// )    
console.log(points)
