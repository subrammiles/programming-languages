"""
String programs asked in Python interviews.
Each shows the Pythonic answer; where interviewers often ask "without built-ins",
a manual version is included too.
"""
from collections import Counter, defaultdict
from itertools import permutations


# 1. Reverse a string
def reverse(s):
    return s[::-1]


def reverse_manual(s):
    chars = list(s)
    i, j = 0, len(chars) - 1
    while i < j:
        chars[i], chars[j] = chars[j], chars[i]
        i, j = i + 1, j - 1
    return "".join(chars)


print(reverse("python"), reverse_manual("python"))         # nohtyp nohtyp


# 2. Palindrome, ignoring case and punctuation
def is_palindrome(s):
    clean = [c.lower() for c in s if c.isalnum()]
    return clean == clean[::-1]


print(is_palindrome("A man, a plan, a canal: Panama"), is_palindrome("python"))   # True False


# 3. Anagrams
def is_anagram(a, b):
    return Counter(a.replace(" ", "").lower()) == Counter(b.replace(" ", "").lower())


print(is_anagram("Listen", "Silent"), is_anagram("rat", "car"))   # True False


# 4. Character frequency and the most common characters
text = "mississippi"
print(Counter(text))                       # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})
print(Counter(text).most_common(2))        # [('i', 4), ('s', 4)]

freq = {}
for ch in text:                            # manual version
    freq[ch] = freq.get(ch, 0) + 1
print(freq)                                # {'m': 1, 'i': 4, 's': 4, 'p': 2}


# 5. First non-repeating character
def first_unique(s):
    counts = Counter(s)
    return next((c for c in s if counts[c] == 1), None)


print(first_unique("swiss"), first_unique("aabb"))   # w None


# 6. Duplicate characters
print(sorted(c for c, n in Counter("programming").items() if n > 1))   # ['g', 'm', 'r']


# 7. Count vowels and consonants
def vowels_consonants(s):
    letters = [c for c in s.lower() if c.isalpha()]
    vowels = sum(c in "aeiou" for c in letters)
    return vowels, len(letters) - vowels


print(vowels_consonants("Hello World"))    # (3, 7)


# 8. Reverse the words; capitalise each word
sentence = "  python is   fun  "
print(" ".join(reversed(sentence.split())))   # fun is python
print(sentence.split()[0].title(), "is fun".title())   # Python Is Fun


# 9. String rotation
def is_rotation(a, b):
    return len(a) == len(b) and b in a + a


print(is_rotation("waterbottle", "erbottlewat"))   # True


# 10. Remove duplicates, keep order
print("".join(dict.fromkeys("programming")))   # progamin   (dicts keep insertion order)


# 11. Compression: aaabbc -> a3b2c1
from itertools import groupby


def compress(s):
    out = "".join(f"{ch}{len(list(group))}" for ch, group in groupby(s))
    return out if len(out) < len(s) else s


print(compress("aaabbcdddd"), compress("abc"))   # a3b2c1d4 abc


# 12. Longest substring without repeating characters (sliding window, O(n))
def longest_unique_substring(s):
    last_seen, start, best = {}, 0, ""
    for end, ch in enumerate(s):
        if last_seen.get(ch, -1) >= start:
            start = last_seen[ch] + 1
        last_seen[ch] = end
        if end - start + 1 > len(best):
            best = s[start:end + 1]
    return best


print(longest_unique_substring("abcabcbb"), longest_unique_substring("pwwkew"))   # abc wke


# 13. Balanced brackets
def is_balanced(s):
    pairs, stack = {")": "(", "]": "[", "}": "{"}, []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs and (not stack or stack.pop() != pairs[ch]):
            return False
    return not stack


print(is_balanced("{[()()]}"), is_balanced("([)]"), is_balanced("(("))   # True False False


# 14. Permutations (library and recursive)
print(["".join(p) for p in permutations("abc")])   # ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']


def perms(s):
    if len(s) <= 1:
        return [s]
    return [s[i] + p for i in range(len(s)) for p in perms(s[:i] + s[i + 1:])]


print(perms("abc") == ["".join(p) for p in permutations("abc")])   # True


# 15. Group anagrams
def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        groups["".join(sorted(w))].append(w)
    return list(groups.values())


print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]


# 16. Word frequency in a paragraph
import re

paragraph = "The cat and the hat. The END, the end!"
words = re.findall(r"[a-z']+", paragraph.lower())
print(Counter(words).most_common(2))       # [('the', 4), ('end', 2)]


# 17. Is it a pangram? (contains every letter)
import string

print(set(string.ascii_lowercase) <= set("The quick brown fox jumps over the lazy dog".lower()))   # True


# 18. Caesar cipher
def caesar(s, shift):
    table = str.maketrans(string.ascii_lowercase, string.ascii_lowercase[shift:] + string.ascii_lowercase[:shift])
    return s.translate(table)


print(caesar("hello", 3), caesar(caesar("hello", 3), -3))   # khoor hello
