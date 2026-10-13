

class Rectangle {
    constructor(height, width) {
      this.name = "Rectangle";
      this.height = height;
      this.width = width;
    }
    sayName() {
      console.log(`Hi, I am a ${this.name}.`);
    }
    get area() {
      return this.height * this.width;
    }
    set area(value) {
      this._area = value;
    }
  }
  
  class Square extends Rectangle {
    constructor(length) {
      // Here, it calls the parent class's constructor with lengths
      // provided for the Rectangle's width and height
      super(length, length);
  
      // Note: In derived classes, super() must be called before you
      // can use 'this'. Moving this to the top causes a ReferenceError.
      this.name = "Square";
    }
  }

  /*
  Here super() is called to avoid duplicating the constructor parts' that are common between Rectangle and Square.
  */