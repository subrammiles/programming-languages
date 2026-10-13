

# Lambda Function with filter
# Code to filter odd numbers from a given list  
list_ = [34, 12, 64, 55, 75, 13, 63]  
  
odd_list = list(filter( lambda num: (num % 2 != 0) , list_ ))  
  
print(odd_list)  


#Map
numbers_list = [2, 4, 5, 1, 3, 7, 8, 9, 10]  
  
squared_list = list(map( lambda num: num ** 2 , numbers_list ))  


#List comprehension
#Code to calculate square of each number of list using list comprehension  
squares = [lambda num = num: num ** 2 for num in range(0, 11)]  
   
for square in squares:  
    print( square(), end = " ")  