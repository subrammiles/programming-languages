


from re import L


def method1():
   list=[1,3]
   list2=["a",1,True]
   list3=["a",1,True,[1,2,3]]
   print(list)
   print(list2)
   print(list3)

def method2():
    list=[1,3,5,6,7]
    print(len(list))

def method3():
    #Slice
    print("<<<<<<<M3>>>>>>.")
    list2=[1,3,7,6,2]
    list=list2.sort()
    print(list)
    print(list[0:2])
    list[0]="0"
    print(list)
    list.append(23)
    print(list)
    list.pop()
    print(list)
    list.pop(2)
    print(list)


def method4():
    #Concat
    print("<<<<<<<M4>>>>>>.")
    list1=[1,2,3]
    list2=[4,5,6]
    print(list1+list2)
  

method1()
method2()
method3()
method4()
