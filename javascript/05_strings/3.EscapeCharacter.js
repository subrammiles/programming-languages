//Because strings must be written within quotes, 
//JavaScript will misunderstand this string:

//let s1 = "In Indian "AP"  is from the south.";
let s2 = "In Indian \"AP\"  is from the south.";
let s3 = "In Indian \'AP\'  is from the south.";
let s4 = "In Indian \\AP\\  is from the south.";
console.log(s2);
console.log(s3)
console.log(s4)