const handler = async (event) => {
  // TODO implement
  temp
    .then((data) => {
      return data;
    })
    .catch(() => {
      return "error";
    });
};

let temp = timeout(3000);

function timeout(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve("I am Just a Modified response -V2"), ms)
  );
}

let x = handler();
console.log(x);
