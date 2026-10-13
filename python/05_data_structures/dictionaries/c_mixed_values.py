
'''
Key Value
{'key':'value',
 'key2':'value2'
}
'''

def method1():
   myDic={'a':1,'b':True,'c':[1,2,3,4],"d":(1,2),'e':{1,2},"f":{'a':1}}
   print(myDic)
   myDic["a"]=34;
   print(myDic)
   print(myDic.keys())

method1()  