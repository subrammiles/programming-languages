// Run: sf apex run --file chapters/03_collections/scripts/collections.apex
Collections.lists();
Collections.sets();
Collections.maps();
System.debug(Collections.countWords('the cat and the hat')); // {and=1, cat=1, hat=1, the=2}
System.debug(Collections.groupByFirstLetter(new List<String>{ 'apple', 'avocado', 'banana' }));
