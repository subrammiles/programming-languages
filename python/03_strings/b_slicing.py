"""
Indexing and slicing: text[start:stop:step]
 - start is included, stop is excluded
 - missing start = beginning, missing stop = end
 - negative numbers count from the end (-1 is the last character)
Slicing never raises IndexError; indexing does.
"""

text = "abcdefghij"

print(text[0])  # a
print(text[1])  # b
print(text[-1])  # j

print("<<<< start to stop >>>>")
print(text[0:1])  # a      -> excludes index 1
print(text[0:])  # abcdefghij
print(text[1:])  # bcdefghij
print(text[:1])  # a
print(text[:4])  # abcd
print(text[-3:])  # hij    -> last three characters
print(text[2:100])  # cdefghij -> no error past the end

print("<<<< step >>>>")
print(text[::1])  # abcdefghij
print(text[::2])  # acegi  -> every second character
print(text[::-1])  # jihgfedcba -> reversed
print(text[1:8:3])  # beh
