/*
Static initialization blocks (ES2022)
static { ... } runs ONCE when the class is defined.
Use it for setup logic that needs more than a single expression,
and it can access #private static fields.
*/
class Config {
  static #secrets = {};
  static env;
  static isProduction;

  static {
    console.log("static block runs once, when the class is created");
    this.env = process.env.NODE_ENV ?? "development";
    this.isProduction = this.env === "production";
    this.#secrets.apiUrl = this.isProduction ? "https://api.example.com" : "http://localhost:3000";
  }

  static get apiUrl() {
    return this.#secrets.apiUrl;
  }
}

console.log(Config.env);// development
console.log(Config.isProduction);// false
console.log(Config.apiUrl);// http://localhost:3000
