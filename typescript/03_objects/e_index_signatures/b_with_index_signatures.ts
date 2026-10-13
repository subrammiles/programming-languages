/*
{ [key: string]: number } says: "any string keys, all values are numbers".
Now the function accepts both salary objects and rejects bad data.
*/

const salary1 = { baseSalary: 100_000, yearlyBonus: 20_000 };
const salary2 = { contractSalary: 110_000 };

function totalSalary(salaryObject: { [key: string]: number }): number {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name] ?? 0; // ?? 0 because a key lookup may be undefined (noUncheckedIndexedAccess)
  }
  return total;
}

console.log(totalSalary(salary1)); // 120000
console.log(totalSalary(salary2)); // 110000
// totalSalary({ bonus: "lots" }); // error TS2322: Type 'string' is not assignable to type 'number'.

const wordCounts: Record<string, number> = {}; // the same idea with a utility type
for (const w of "the cat and the hat".split(" ")) wordCounts[w] = (wordCounts[w] ?? 0) + 1;
console.log(wordCounts); // { the: 2, cat: 1, and: 1, hat: 1 }
