/*
Design patterns: Factory and Builder

Factory: a function that creates objects for you, so callers do not need `new`
or need to know WHICH class to create.

Builder: build a complex object step by step with chained methods.
In JS, an options object with defaults often replaces a builder.
*/

console.log("<<<< factory function (no class, no new, private data via closure) >>>>");
function createUser(name, role = "viewer") {
  let loginCount = 0;// private
  return {
    name,
    role,
    login() {
      loginCount++;
      return `${name} logged in (${loginCount}x)`;
    },
  };
}
const ann = createUser("Ann", "admin");
ann.login();
console.log(ann.login(), ann.loginCount);// Ann logged in (2x) undefined

console.log("<<<< factory that chooses the class >>>>");
class EmailNotifier {
  send(msg) {
    return `email: ${msg}`;
  }
}
class SmsNotifier {
  send(msg) {
    return `sms: ${msg.slice(0, 20)}`;
  }
}
class PushNotifier {
  send(msg) {
    return `push: ${msg}`;
  }
}
const notifiers = { email: EmailNotifier, sms: SmsNotifier, push: PushNotifier };
function createNotifier(type) {
  const Notifier = notifiers[type];
  if (!Notifier) throw new Error(`unknown notifier: ${type}`);
  return new Notifier();
}
for (const type of ["email", "sms", "push"]) {
  console.log(createNotifier(type).send("Your order has shipped today"));
}
// email: Your order has shipped today
// sms: Your order has shipp
// push: Your order has shipped today

console.log("<<<< builder with method chaining >>>>");
class QueryBuilder {
  #table;
  #wheres = [];
  #order = "";
  #limit = null;
  from(table) {
    this.#table = table;
    return this;// returning `this` is what makes chaining work
  }
  where(condition) {
    this.#wheres.push(condition);
    return this;
  }
  orderBy(column, dir = "ASC") {
    this.#order = ` ORDER BY ${column} ${dir}`;
    return this;
  }
  limit(n) {
    this.#limit = n;
    return this;
  }
  build() {
    const where = this.#wheres.length ? ` WHERE ${this.#wheres.join(" AND ")}` : "";
    const limit = this.#limit ? ` LIMIT ${this.#limit}` : "";
    return `SELECT * FROM ${this.#table}${where}${this.#order}${limit}`;
  }
}
const sql = new QueryBuilder().from("users").where("age > 18").where("active = true").orderBy("name").limit(10).build();
console.log(sql);// SELECT * FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10

console.log("<<<< the JS alternative: an options object >>>>");
function createRequest({ url, method = "GET", headers = {}, timeout = 5000 }) {
  return { url, method, headers, timeout };
}
console.log(createRequest({ url: "/api", timeout: 1000 }));// { url: '/api', method: 'GET', headers: {}, timeout: 1000 }
