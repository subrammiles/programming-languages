"""
 heapq  - a priority queue: always pop the SMALLEST item quickly
 bisect - search and insert into a SORTED list quickly
"""
import bisect
import heapq

tasks = []
heapq.heappush(tasks, (3, "write report"))
heapq.heappush(tasks, (1, "fix production bug"))
heapq.heappush(tasks, (2, "review PR"))
while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, task)  # 1, 2, 3 in order

scores = [55, 91, 78, 64, 99, 83]
print(heapq.nlargest(3, scores), heapq.nsmallest(2, scores))  # [99, 91, 83] [55, 64]

print("<<<< bisect >>>>")
grades = [60, 70, 80, 90]
letters = "FDCBA"
for score in [55, 70, 85, 99]:
    print(score, letters[bisect.bisect_right(grades, score)])  # F C B A

sorted_list = [10, 20, 40]
bisect.insort(sorted_list, 30)
print(sorted_list)  # [10, 20, 30, 40] -> still sorted
