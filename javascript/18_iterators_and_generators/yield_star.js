
//The yield* operator is used to delegate to another iterable object, such as a Generator.

function* func1() {
    yield 42;
  }
  
  function* func2() {
    yield* func1();
  }
  
  const iterator = func2();
  
  console.log(iterator.next().value);
  // Expected output: 42