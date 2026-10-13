/*
Making your own object iterable
Add a [Symbol.iterator]() method that returns an object with next().
*/
console.log("<<<<Test1 - a Range object>>>>>")
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const n of range) console.log(n);// 1 2 3 4 5
console.log([...range]);// [ 1, 2, 3, 4, 5 ]
const [first, second] = range;
console.log(first, second);// 1 2

console.log("<<<<Test2 - same thing with a generator (much shorter)>>>>>")
class Playlist {
  constructor(...songs) { this.songs = songs; }
  *[Symbol.iterator]() {
    for (const song of this.songs) yield song;
  }
}
const playlist = new Playlist("Song A", "Song B", "Song C");
for (const song of playlist) console.log(song);
console.log(Array.from(playlist).length);// 3

console.log("<<<<Test3 - infinite iterable (be careful with spread!)>>>>>")
const naturals = {
  *[Symbol.iterator]() {
    let n = 1;
    while (true) yield n++;
  }
};
for (const n of naturals) {
  if (n > 3) break;// break calls the iterator's return() and stops it
  console.log(n);// 1 2 3
}
