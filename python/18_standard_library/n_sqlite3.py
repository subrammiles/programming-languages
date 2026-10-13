"""
sqlite3 - a complete SQL database in a single file (or in memory), built into Python.
Always use ? placeholders for values: never build SQL with f-strings (SQL injection).
"""
import sqlite3

with sqlite3.connect(":memory:") as conn:  # use a filename like "shop.db" to keep the data
    conn.row_factory = sqlite3.Row  # rows behave like dicts
    conn.execute("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER)")
    conn.executemany(
        "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
        [("pen", 10.0, 100), ("book", 250.0, 20), ("bag", 900.0, 5)],
    )

    for row in conn.execute("SELECT name, price FROM products WHERE price > ? ORDER BY price", (50,)):
        print(row["name"], row["price"])  # book 250.0 / bag 900.0

    conn.execute("UPDATE products SET stock = stock - 1 WHERE name = ?", ("bag",))
    print(conn.execute("SELECT stock FROM products WHERE name = 'bag'").fetchone()[0])  # 4

    total = conn.execute("SELECT SUM(price * stock) FROM products").fetchone()[0]
    print(f"stock value: {total:,.0f}")  # 9,600

    user_input = "pen' OR '1'='1"
    rows = conn.execute("SELECT * FROM products WHERE name = ?", (user_input,)).fetchall()
    print(len(rows), "rows -> the injection attempt matched nothing")  # 0
