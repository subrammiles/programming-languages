/*
Uses a parameter property, so run with:
  node --experimental-transform-types 15_patterns/d_builder_and_fluent_api.ts

Using the type system to guide an API: a query builder whose methods return "this",
so calls chain, and whose types remember which columns were selected.
*/

class Query<Row extends Record<string, unknown>, Selected extends keyof Row = keyof Row> {
  #columns: string[] = [];
  #conditions: string[] = [];

  constructor(private readonly table: string) {}

  select<K extends keyof Row>(...columns: K[]): Query<Row, K> {
    this.#columns = columns.map(String);
    return this as unknown as Query<Row, K>;
  }

  where(condition: string): this {
    this.#conditions.push(condition);
    return this;
  }

  toSQL(): string {
    const cols = this.#columns.length ? this.#columns.join(", ") : "*";
    const where = this.#conditions.length ? ` WHERE ${this.#conditions.join(" AND ")}` : "";
    return `SELECT ${cols} FROM ${this.table}${where}`;
  }

  // Pretend result: only the selected columns exist on each row
  run(fake: Pick<Row, Selected>[]): Pick<Row, Selected>[] {
    return fake;
  }
}

type User = { id: number; name: string; email: string };

const q = new Query<User>("users").select("id", "name").where("id > 10").where("name LIKE 'A%'");
console.log(q.toSQL()); // SELECT id, name FROM users WHERE id > 10 AND name LIKE 'A%'
const rows = q.run([{ id: 11, name: "Asha" }]);
console.log(rows[0]?.name); // Asha
// rows[0]?.email; // error: email was not selected
// new Query<User>("users").select("password"); // error: not a column of User
