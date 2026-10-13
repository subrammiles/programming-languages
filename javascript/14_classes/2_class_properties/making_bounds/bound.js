class Button {
    constructor(value) {
      this.value = value;
    }
    click() {
      console.log(this.value);
    }
  }
  let button = new Button("hello");
  button.click() //this will work
  setTimeout(button.click, 1000); // undefined

  /*The problem is called "losing this". */
  /*Soultion
  1.Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
2.Bind the method to object, e.g. in the constructor.
  */