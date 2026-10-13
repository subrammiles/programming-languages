/*
An any[] array accepts anything, which is tempting for third-party data
whose shape you don't know. Usually a union or unknown[] is the better choice.
*/

const unknownData: any[] = [1, "data1"];
unknownData.push("data2", 2, true);
console.log(unknownData); // [ 1, 'data1', 'data2', 2, true ]

// const onlyNumbers: number[] = [1, "data1"]; // error TS2322: Type 'string' is not assignable to type 'number'.

const better: (number | string)[] = [1, "data1"]; // say exactly what's allowed
better.push(2);
console.log(better);
