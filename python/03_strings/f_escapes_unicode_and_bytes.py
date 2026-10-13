"""
Escape sequences: \n new line, \t tab, \\ backslash, \' \" quotes, \u00e9 unicode
str holds TEXT (Unicode). bytes holds raw BYTES (files, network).
 text.encode("utf-8") -> bytes
 data.decode("utf-8") -> str
"""
print("Line 1\nLine 2\tTabbed")
print('It\'s fine', "He said \"hi\"")
print("caf\u00e9", "\N{GREEK SMALL LETTER PI}")  # café π

print("<<<< ord and chr >>>>")
print(ord("A"), chr(65), ord("€"))  # 65 A 8364

print("<<<< encode / decode >>>>")
word = "naïve €"
data = word.encode("utf-8")
print(data)  # b'na\xc3\xafve \xe2\x82\xac'
print(len(word), len(data))  # 7 10 -> characters vs bytes
print(data.decode("utf-8"))  # naïve €

print("<<<< bytes literals >>>>")
raw = b"\x48\x69"
print(raw, raw.decode())  # b'Hi' Hi
print(list(b"AB"))  # [65, 66]
