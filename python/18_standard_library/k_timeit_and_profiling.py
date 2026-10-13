"""
Measuring speed
 time.perf_counter()  simple timing
 timeit               run a snippet many times for an accurate comparison
 cProfile             find WHICH functions are slow
 Python 3.15: python -m profiling.sampling  -> a low-overhead sampling profiler
                                               that can attach to a running program
"""
import cProfile
import pstats
import io
import timeit

print(timeit.timeit("[x * x for x in range(1000)]", number=2000))
print(timeit.timeit("list(map(lambda x: x * x, range(1000)))", number=2000))
print(timeit.timeit("'-'.join(str(n) for n in range(100))", number=10000))


def slow():
    return sum(i * i for i in range(200_000))


def work():
    for _ in range(5):
        slow()


profiler = cProfile.Profile()
profiler.enable()
work()
profiler.disable()
out = io.StringIO()
pstats.Stats(profiler, stream=out).sort_stats("cumulative").print_stats(4)
print(out.getvalue()[:600])
