"""
 yield from iterable   -> yield every value from another iterable/generator
 Generator pipelines   -> chain small generators like Unix pipes; data flows one item at a time
 send()                -> push a value INTO a running generator (advanced, rarely needed)
"""


def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item


print(list(flatten([1, [2, [3, 4]], 5])))  # [1, 2, 3, 4, 5]

print("<<<< pipeline: read -> parse -> filter -> total >>>>")
log = """GET /home 200 512
GET /about 404 0
POST /login 200 128
GET /home 500 0
GET /blog 200 2048"""


def lines(text):
    yield from text.splitlines()


def parse(rows):
    for row in rows:
        method, path, status, size = row.split()
        yield {"path": path, "status": int(status), "size": int(size)}


def successful(records):
    return (r for r in records if r["status"] == 200)


total = sum(r["size"] for r in successful(parse(lines(log))))
print("bytes served:", total)  # bytes served: 2688


def running_average():
    total = count = 0
    average = None
    while True:
        value = yield average
        total += value
        count += 1
        average = total / count


avg = running_average()
next(avg)  # start the generator
print(avg.send(10), avg.send(20), avg.send(60))  # 10.0 15.0 30.0
