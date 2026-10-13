/*
Debounce
Wait until calls STOP for `delay` ms, then run once.
Use for: search boxes (search after typing stops), window resize, auto-save.
*/
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);// cancel the previous pending call
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => console.log(`searching for "${query}"`), 300);

// Simulate typing "java" quickly, one key every 100ms
["j", "ja", "jav", "java"].forEach((text, i) => {
  setTimeout(() => {
    console.log(`typed: ${text}`);
    search(text);
  }, i * 100);
});
// typed: j
// typed: ja
// typed: jav
// typed: java
// searching for "java"   <- only once, 300ms after the last key
