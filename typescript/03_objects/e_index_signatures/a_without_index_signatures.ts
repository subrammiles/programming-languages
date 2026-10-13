/*
Two objects describing the salary of two employees, with DIFFERENT property names.
We want one function that totals any such object. Without an index signature
the only way to accept both is "any", which checks nothing.
*/

const salary1 = { baseSalary: 100_000, yearlyBonus: 20_000 };
const salary2 = { contractSalary: 110_000 };

function totalSalary(salaryObject: any): number {
  let total = 0;
  for (const name in salaryObject) {
    total += salaryObject[name];
  }
  return total;
}

console.log(totalSalary(salary1)); // 120000
console.log(totalSalary(salary2)); // 110000
console.log(totalSalary({ bonus: "lots" })); // 0lots -> nonsense, but no error with any
