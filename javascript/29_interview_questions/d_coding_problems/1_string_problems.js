/*
Coding problems: strings
Each problem shows the short "JS built-ins" answer and, where interviewers
often forbid built-ins, a manual version. Time complexity is noted as O(...).
*/

console.log("<<<< 1. Reverse a string >>>>");
const reverse = (s) => [...s].reverse().join("");// [...s] splits by character, safe for emoji
function reverseManual(s) {
  let out = "";
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}
console.log(reverse("hello"), reverseManual("hello"));// olleh olleh

console.log("<<<< 2. Palindrome (ignore case and non-letters) >>>>");
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;// two pointers moving inward: O(n), no extra copy
  while (left < right) {
    if (clean[left++] !== clean[right--]) return false;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama"), isPalindrome("hello"));// true false

console.log("<<<< 3. Anagram check >>>>");
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = {};
  for (const ch of a) count[ch] = (count[ch] ?? 0) + 1;
  for (const ch of b) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;// O(n), better than sorting both strings: O(n log n)
}
console.log(isAnagram("listen", "silent"), isAnagram("rat", "car"));// true false

console.log("<<<< 4. Character frequency / most frequent character >>>>");
function mostFrequentChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  let best = null;
  for (const [ch, n] of freq) if (best === null || n > freq.get(best)) best = ch;
  return { freq: Object.fromEntries(freq), best };
}
console.log(mostFrequentChar("javascript"));
// { freq: { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 }, best: 'a' }

console.log("<<<< 5. Count vowels >>>>");
const countVowels = (s) => (s.match(/[aeiou]/gi) ?? []).length;
console.log(countVowels("Interview Questions"));// 8

console.log("<<<< 6. First non-repeating character >>>>");
function firstUnique(s) {
  const count = {};
  for (const ch of s) count[ch] = (count[ch] ?? 0) + 1;
  for (const ch of s) if (count[ch] === 1) return ch;
  return null;
}
console.log(firstUnique("swiss"), firstUnique("aabb"));// w null

console.log("<<<< 7. Capitalize each word >>>>");
const titleCase = (s) =>
  s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
console.log(titleCase("hello wORLD from js"));// Hello World From Js

console.log("<<<< 8. Reverse the words in a sentence >>>>");
const reverseWords = (s) => s.trim().split(/\s+/).reverse().join(" ");
console.log(reverseWords("  the sky   is blue "));// blue is sky the

console.log("<<<< 9. Longest word >>>>");
const longestWord = (s) => s.split(" ").reduce((best, w) => (w.length > best.length ? w : best), "");
console.log(longestWord("I love programming in JavaScript"));// programming

console.log("<<<< 10. Compress a string (aaabcc -> a3b1c2) >>>>");
function compress(s) {
  let out = "";
  for (let i = 0, run = 1; i < s.length; i++, run++) {
    if (s[i] !== s[i + 1]) {
      out += s[i] + run;
      run = 0;
    }
  }
  return out.length < s.length ? out : s;// only use it if it is shorter
}
console.log(compress("aaabccddddd"), compress("abc"));// a3b1c2d5 abc

console.log("<<<< 11. Longest substring without repeating characters (sliding window) >>>>");
function longestUniqueSubstring(s) {
  const lastSeen = new Map();
  let start = 0;
  let best = "";
  for (let end = 0; end < s.length; end++) {
    if (lastSeen.has(s[end]) && lastSeen.get(s[end]) >= start) start = lastSeen.get(s[end]) + 1;
    lastSeen.set(s[end], end);
    if (end - start + 1 > best.length) best = s.slice(start, end + 1);
  }
  return best;// O(n)
}
console.log(longestUniqueSubstring("abcabcbb"), longestUniqueSubstring("pwwkew"));// abc wke

console.log("<<<< 12. Valid parentheses (stack) >>>>");
function isBalanced(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if ("([{".includes(ch)) stack.push(ch);
    else if (ch in pairs && stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}
console.log(isBalanced("{[()()]}"), isBalanced("([)]"), isBalanced("(("));// true false false

console.log("<<<< 13. Group anagrams >>>>");
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");// anagrams share the same sorted letters
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
