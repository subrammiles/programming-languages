/*You have 2 objects that describe the salary 
of 2 US employee :*/

const salary1 = {
    baseSalary: 10000,
    yearlyBonus: 20_000
};

const salary2 = {
    contractSalary: 110_000
};

/*You want to implement a function that returns the 
total remuneration based on the salary object: */
function totalSalary(salaryObject: any) {
    let total = 0;
    for (const name in salaryObject) {
        total += salaryObject[name];
    }
    return total;
}

console.log(totalSalary(salary1)); // => 120_000
console.log(totalSalary(salary2)); // => 110_000

//How would you annotate salaryObject parameter of totalSalary() function to accept objects with key as string and value as number?

//The answer is to use an index signature!