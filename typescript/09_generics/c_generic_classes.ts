/*
Generic classes and interfaces: containers that work with any type.
*/

class Box<T> {
  #value: T | undefined;

  set(value: T): void {
    this.#value = value;
  }

  get(): T | undefined {
    return this.#value;
  }

  hasValue(): boolean {
    return this.#value !== undefined;
  }
}

const numberBox = new Box<number>();
console.log(numberBox.hasValue()); // false
numberBox.set(42);
// numberBox.set("42"); // error TS2345
console.log(numberBox.hasValue(), numberBox.get()); // true 42

interface Repository<T extends { id: number }> {
  add(item: T): void;
  findById(id: number): T | undefined;
}

class MemoryRepository<T extends { id: number }> implements Repository<T> {
  #items = new Map<number, T>();
  add(item: T): void {
    this.#items.set(item.id, item);
  }
  findById(id: number): T | undefined {
    return this.#items.get(id);
  }
}

const users = new MemoryRepository<{ id: number; name: string }>();
users.add({ id: 1, name: "Asha" });
console.log(users.findById(1)?.name, users.findById(2)); // Asha undefined
