/*
padStart(targetLength, padString) / padEnd(targetLength, padString)
Pads the string until it reaches targetLength.
*/
console.log("5".padStart(3, "0"));// 005
console.log("42".padEnd(5, "*"));// 42***

// Masking a card number
const card = "4111111111111111";
console.log(card.slice(-4).padStart(card.length, "*"));// ************1111

// Aligning columns in console output
const items = [["Tea", 20], ["Coffee", 150], ["Juice", 75]];
for (const [item, price] of items) {
  console.log(item.padEnd(10, ".") + String(price).padStart(5));
}
// Tea.......   20
// Coffee....  150
// Juice.....   75
