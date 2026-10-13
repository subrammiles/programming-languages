@IsTest
private class CollectionsTest {
    @IsTest
    static void listsAreOrderedAndSortable() {
        Assert.areEqual(new List<String>{ 'blue', 'green', 'red' }, Collections.lists());
    }

    @IsTest
    static void setsRemoveDuplicates() {
        Set<String> tags = Collections.sets();
        Assert.areEqual(3, tags.size());
        Assert.isTrue(tags.contains('lwc'));
    }

    @IsTest
    static void mapsStoreKeyValuePairs() {
        Map<String, Integer> stock = Collections.maps();
        Assert.areEqual(15, stock.get('pen'));
        Assert.isNull(stock.get('missing'));
    }

    @IsTest
    static void countWords() {
        Map<String, Integer> counts = Collections.countWords('the cat and the hat');
        Assert.areEqual(2, counts.get('the'));
        Assert.areEqual(1, counts.get('cat'));
    }

    @IsTest
    static void groupByFirstLetter() {
        Map<String, List<String>> groups = Collections.groupByFirstLetter(new List<String>{ 'apple', 'avocado', 'banana' });
        Assert.areEqual(2, groups.get('a').size());
        Assert.areEqual('banana', groups.get('b')[0]);
    }
}
