/*
EventEmitter - the publish/subscribe pattern
Many Node APIs are EventEmitters: streams, http servers, process.
  on(event, fn)   -> listen
  once(event, fn) -> listen one time only
  emit(event, ...args) -> trigger all listeners, synchronously, in order
  off(event, fn)  -> stop listening
*/
const { EventEmitter, once } = require("node:events");

class Shop extends EventEmitter {
  order(item, qty) {
    console.log(`order placed: ${qty} x ${item}`);
    this.emit("order", { item, qty });
    if (qty > 10) this.emit("bulkOrder", item);
  }
}

const shop = new Shop();

const sendEmail = ({ item }) => console.log(`  email: thanks for buying ${item}`);
shop.on("order", sendEmail);
shop.on("order", ({ item, qty }) => console.log(`  stock: -${qty} ${item}`));
shop.once("bulkOrder", (item) => console.log(`  first bulk order of ${item}!`));

shop.order("pens", 2);
shop.order("paper", 20);
shop.order("paper", 50);// once listener does not run again

shop.off("order", sendEmail);
shop.order("ink", 1);// no email now

console.log("<<<< the 'error' event >>>>");
// If nobody listens for "error", emitting it crashes the program
shop.on("error", (err) => console.log("handled:", err.message));
shop.emit("error", new Error("payment failed"));

console.log("<<<< await an event >>>>");
(async () => {
  setTimeout(() => shop.emit("ready", "shop is open"), 100);
  const [message] = await once(shop, "ready");
  console.log(message);// shop is open
})();
