/**
 * Collections
 *  List<T>    ordered, allows duplicates, index from 0      (arrays are Lists: String[] = List<String>)
 *  Set<T>     unordered, unique values, fast contains()
 *  Map<K, V>  key -> value
 * Collections can hold sObjects, other collections, and custom types.
 */
public with sharing class Collections {
    public static List<String> lists() {
        List<String> colors = new List<String>{ 'red', 'green' };
        colors.add('blue');
        colors.add(0, 'black'); // insert at index 0
        System.debug(colors); // (black, red, green, blue)
        System.debug(colors.get(1) + ' ' + colors[2]); // red green
        System.debug(colors.size() + ' ' + colors.contains('green')); // 4 true
        colors.remove(0);
        colors.sort();
        System.debug(colors); // (blue, green, red)

        String[] sameThing = new String[]{ 'a', 'b' }; // array syntax creates a List<String>
        sameThing.add('c');
        System.debug(sameThing); // (a, b, c)

        List<List<Integer>> grid = new List<List<Integer>>{ new List<Integer>{ 1, 2 }, new List<Integer>{ 3, 4 } };
        System.debug(grid[1][0]); // 3
        return colors;
    }

    public static Set<String> sets() {
        Set<String> tags = new Set<String>{ 'apex', 'soql', 'apex' };
        System.debug(tags.size()); // 2 -> duplicates removed
        tags.add('lwc');
        System.debug(tags.contains('soql')); // true

        Set<String> other = new Set<String>{ 'lwc', 'flow' };
        Set<String> common = tags.clone();
        common.retainAll(other); // intersection
        System.debug(common); // {lwc}
        return tags;
    }

    public static Map<String, Integer> maps() {
        Map<String, Integer> stock = new Map<String, Integer>{ 'pen' => 10, 'book' => 4 };
        stock.put('bag', 2);
        stock.put('pen', stock.get('pen') + 5);
        System.debug(stock.get('pen')); // 15
        System.debug(stock.get('missing')); // null (no error)
        System.debug(stock.containsKey('bag')); // true
        System.debug(stock.keySet()); // {bag, book, pen}
        System.debug(stock.values().size()); // 3

        for (String item : stock.keySet()) {
            System.debug(item + ' => ' + stock.get(item));
        }
        return stock;
    }

    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> counts = new Map<String, Integer>();
        for (String word : text.toLowerCase().split(' ')) {
            Integer current = counts.get(word) ?? 0;
            counts.put(word, current + 1);
        }
        return counts;
    }

    public static Map<String, List<String>> groupByFirstLetter(List<String> words) {
        Map<String, List<String>> groups = new Map<String, List<String>>();
        for (String w : words) {
            String key = w.left(1);
            if (!groups.containsKey(key)) {
                groups.put(key, new List<String>());
            }
            groups.get(key).add(w);
        }
        return groups;
    }
}
