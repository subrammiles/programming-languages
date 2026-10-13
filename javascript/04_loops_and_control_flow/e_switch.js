

let x = 1 ;
switch (x) {
  case 1:
    console.log(" X value is = 1");
    break;
  case 2:
    console.log(" X value is = 2");
    break;
  case 3:
    console.log(" X value is = 3");
    break;
  default:
    console.log( " X value is null" );
}



///Grouping of cases


let y = 1 ;
switch (y) {
  case 1:
  case 3:
  case 5:
  case 7:
    console.log(" Y value odd");
    break;
  case 4:
  case 6:
  case 8:
  case 10:
        console.log(" Y value even");
        break;
  default:
    alert( " Y value is 2" );
}


