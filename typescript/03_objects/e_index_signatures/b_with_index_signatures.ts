/*You have 2 objects that describe the salary 
of 2 software developers:*/

const salary1V2 = {
    baseSalary: 100_000,
    yearlyBonus: 20_000
  };
  
  const salary2V2 = {
    contractSalary: 110_000
  };

/*You want to implement a function that returns the 
total remuneration based on the salary object: */

//{ [key: string]: number } is the index signature, 
//which tells TypeScript that salaryObject has to be an object with string type as key and number type as value.
  function totalSalaryV2(salaryObject: { [key: string]: number }) {
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