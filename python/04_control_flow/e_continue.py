#In Python, the continue keyword return control of the iteration to the beginning of the Python for loop or Python while loop. All remaining lines in the prevailing iteration of the loop are skipped by the continue keyword, which returns execution to the beginning of the next iteration of the loop.

list=[1,2,3,4,5]

for i in list:
    if i==3:
     continue;
    print(i) 

# result is 1,2,4,5,when     