package ch25_interview_questions.a_string_programs;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/*
String programs asked in Java interviews.
Each shows the expected answer, often with a manual version (no library shortcuts)
because interviewers like to see the loop.
*/
public class StringPrograms {

    // 1. Reverse a string
    static String reverse(String s) {
        char[] chars = s.toCharArray();
        for (int i = 0, j = chars.length - 1; i < j; i++, j--) {
            char tmp = chars[i];
            chars[i] = chars[j];
            chars[j] = tmp;
        }
        return new String(chars);                     // or: new StringBuilder(s).reverse().toString()
    }

    // 2. Palindrome (ignoring case and non-letters)
    static boolean isPalindrome(String s) {
        String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        for (int i = 0, j = clean.length() - 1; i < j; i++, j--) {
            if (clean.charAt(i) != clean.charAt(j)) return false;
        }
        return true;
    }

    // 3. Anagrams: same letters, same counts
    static boolean areAnagrams(String a, String b) {
        if (a.length() != b.length()) return false;
        int[] counts = new int[26];                   // works for lowercase a-z
        for (int i = 0; i < a.length(); i++) {
            counts[a.charAt(i) - 'a']++;
            counts[b.charAt(i) - 'a']--;
        }
        for (int c : counts) if (c != 0) return false;
        return true;
    }

    // 4. Count occurrences of each character (keeping first-seen order)
    static Map<Character, Integer> charFrequency(String s) {
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);
        return freq;
    }

    // 5. First non-repeated character
    static Character firstNonRepeated(String s) {
        Map<Character, Integer> freq = charFrequency(s);
        for (Map.Entry<Character, Integer> e : freq.entrySet()) {
            if (e.getValue() == 1) return e.getKey();
        }
        return null;
    }

    // 6. Duplicate characters
    static Set<Character> duplicateChars(String s) {
        Set<Character> seen = new HashSet<>(), dups = new java.util.TreeSet<>();
        for (char c : s.toCharArray()) {
            if (!seen.add(c)) dups.add(c);            // add() returns false if already present
        }
        return dups;
    }

    // 7. Count vowels and consonants
    static int[] vowelsAndConsonants(String s) {
        int vowels = 0, consonants = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if (c < 'a' || c > 'z') continue;
            if ("aeiou".indexOf(c) >= 0) vowels++;
            else consonants++;
        }
        return new int[] {vowels, consonants};
    }

    // 8. Reverse the order of words
    static String reverseWords(String sentence) {
        String[] words = sentence.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(' ');
        }
        return sb.toString();
    }

    // 9. Is one string a rotation of another?  ("waterbottle", "erbottlewat")
    static boolean isRotation(String a, String b) {
        return a.length() == b.length() && (a + a).contains(b);
    }

    // 10. Remove duplicate characters, keep the first occurrence
    static String removeDuplicates(String s) {
        StringBuilder sb = new StringBuilder();
        Set<Character> seen = new HashSet<>();
        for (char c : s.toCharArray()) if (seen.add(c)) sb.append(c);
        return sb.toString();
    }

    // 11. String compression: aaabbc -> a3b2c1
    static String compress(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            int run = 1;
            while (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {
                run++;
                i++;
            }
            sb.append(s.charAt(i)).append(run);
        }
        return sb.length() < s.length() ? sb.toString() : s;
    }

    // 12. Longest substring without repeating characters (sliding window, O(n))
    static String longestUniqueSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int start = 0, bestStart = 0, bestLen = 0;
        for (int end = 0; end < s.length(); end++) {
            char c = s.charAt(end);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= start) start = lastSeen.get(c) + 1;
            lastSeen.put(c, end);
            if (end - start + 1 > bestLen) {
                bestLen = end - start + 1;
                bestStart = start;
            }
        }
        return s.substring(bestStart, bestStart + bestLen);
    }

    // 13. Balanced brackets with a stack
    static boolean isBalanced(String s) {
        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();
        for (char c : s.toCharArray()) {
            switch (c) {
                case '(', '[', '{' -> stack.push(c);
                case ')' -> { if (stack.isEmpty() || stack.pop() != '(') return false; }
                case ']' -> { if (stack.isEmpty() || stack.pop() != '[') return false; }
                case '}' -> { if (stack.isEmpty() || stack.pop() != '{') return false; }
                default -> { }
            }
        }
        return stack.isEmpty();
    }

    // 14. All permutations of a string
    static List<String> permutations(String s) {
        if (s.length() <= 1) return new ArrayList<>(List.of(s));
        List<String> result = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            String rest = s.substring(0, i) + s.substring(i + 1);
            for (String p : permutations(rest)) result.add(s.charAt(i) + p);
        }
        return result;
    }

    // 15. Group anagrams
    static Map<String, List<String>> groupAnagrams(List<String> words) {
        return words.stream().collect(Collectors.groupingBy(w -> {
            char[] c = w.toCharArray();
            Arrays.sort(c);
            return new String(c);
        }, LinkedHashMap::new, Collectors.toList()));
    }

    public static void main(String[] args) {
        System.out.println(reverse("Java"));                                   // avaJ
        System.out.println(isPalindrome("A man, a plan, a canal: Panama") + " " + isPalindrome("Java"));   // true false
        System.out.println(areAnagrams("listen", "silent") + " " + areAnagrams("rat", "car"));            // true false
        System.out.println(charFrequency("banana"));                           // {b=1, a=3, n=2}
        System.out.println(firstNonRepeated("swiss") + " " + firstNonRepeated("aabb"));                    // w null
        System.out.println(duplicateChars("programming"));                     // [g, m, r]
        System.out.println(Arrays.toString(vowelsAndConsonants("Hello World")));   // [3, 7]
        System.out.println(reverseWords("  Java is   fun "));                  // fun is Java
        System.out.println(isRotation("waterbottle", "erbottlewat"));          // true
        System.out.println(removeDuplicates("programming"));                   // progamin
        System.out.println(compress("aaabbcdddd") + " " + compress("abc"));    // a3b2c1d4 abc
        System.out.println(longestUniqueSubstring("abcabcbb") + " " + longestUniqueSubstring("pwwkew"));   // abc wke
        System.out.println(isBalanced("{[()]}") + " " + isBalanced("([)]"));   // true false
        System.out.println(permutations("abc"));                               // [abc, acb, bac, bca, cab, cba]
        System.out.println(groupAnagrams(List.of("eat", "tea", "tan", "ate", "nat", "bat")));
        // {aet=[eat, tea, ate], ant=[tan, nat], abt=[bat]}

        // Bonus: character frequency with streams
        Map<Character, Long> counts = "hello".chars().mapToObj(c -> (char) c)
                .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
        System.out.println(counts);                                            // {h=1, e=1, l=2, o=1}
    }
}
