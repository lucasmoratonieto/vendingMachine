import os


def productSelected(clientSelection):
    global dineroInMachineInitial
    print(dineroInMachineInitial)
    global productsInMachineInitial
    currentMoneyEntered=0
    moneyUsedByClient={}
    print('You have selected: '+ productsInMachineInitial[clientSelection]["product"] + ". \nThe price of the product is: " + str(productsInMachineInitial[clientSelection]["price"]) + "$.")
    # print('Please enter option:')
    # print('1. 100 dollars')
    # print('2. 10 dollars')
    # print('3. 5 dollars')
    # prfloat'4. One dollar')

    print('Please enter option:')    
    print ("{:<8} {:<8}  ".format('Number','Value'))
    number =  1
    for i in dineroInMachineInitial:
        print("{:<8} {:<15} ".format(number, dineroInMachineInitial[i]['value'] ))
        number += 1

    moneyEnteredByClient = float(input("Enter Money "))
    moneyUsedByClient[dineroInMachineInitial[moneyEnteredByClient]['value']] = 1
    print('----------------------------------------')
    while currentMoneyEntered < productsInMachineInitial[clientSelection]["price"]:
            currentMoneyEntered += float(dineroInMachineInitial[moneyEnteredByClient]['value'])
            print(f'Current money entered is: {currentMoneyEntered}$')
            print('----------------------------------------')
            

            if currentMoneyEntered < productsInMachineInitial[clientSelection]["price"]:
                print(f'Please select next option, more money needed, the price of the product is {productsInMachineInitial[clientSelection]["price"]}$')
                moneyEnteredByClient = float(input(f'Money remaining: {productsInMachineInitial[clientSelection]["price"] - currentMoneyEntered }$:'))
                print('----------------------------------------')
                if dineroInMachineInitial[moneyEnteredByClient]['value'] in moneyUsedByClient:
                    moneyUsedByClient[dineroInMachineInitial[moneyEnteredByClient]['value']] = moneyUsedByClient[dineroInMachineInitial[moneyEnteredByClient]['value']] + 1
                else:
                    moneyUsedByClient[dineroInMachineInitial[moneyEnteredByClient]['value']] = 1

    print(moneyUsedByClient)
    changeMoneyInMachine(dineroInMachineInitial,moneyUsedByClient )
    changeProductsInMachine(clientSelection,productsInMachineInitial )
    moneyEntered(currentMoneyEntered)
    

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to open and write the money file 💵
def openMoneyinMachineFunction():
    with open('moneyInMachineInitial.txt', 'r') as machineMoney:
        return (machineMoney.read().strip())
   
def changeMoneyInMachine(dineroInMachineInitial, moneyEnteredList):
    dineroInMachine=dineroInMachineInitial
    
    for eachMoney in range(1,len(dineroInMachineInitial)+1):
        
        if dineroInMachineInitial[eachMoney]['value'] in moneyEnteredList:
            dineroInMachine[eachMoney]['cuantity'] = dineroInMachineInitial[eachMoney]['cuantity'] + moneyEnteredList[dineroInMachineInitial[eachMoney]['value']]    
        
            
    with open('moneyInMachineInitial.txt', 'w') as machineMoney:
        machineMoney.write(str(dineroInMachine))
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to open and write the products file
def openProductsinMachineFunction():
    with open('productsInMachine.txt', 'r') as machineMoney:
        return (machineMoney.read().strip())
   

#    TO BE DONE 🛒

def changeProductsInMachine(clientSelection,productsInMachineInitial):

    productsInMachine={}
    
    for eachProduct in productsInMachineInitial:
        if eachProduct == clientSelection:
            productToEraseOne = productsInMachineInitial[clientSelection]['cuantity'] - 1
            productsInMachine[eachProduct] = productsInMachineInitial[eachProduct]
            productsInMachine[eachProduct]['cuantity'] = productToEraseOne
        else:
            productsInMachine[eachProduct]= productsInMachineInitial[eachProduct]
        
    print(productsInMachine)
    with open('productsInMachine.txt', 'w') as machineMoney:
        machineMoney.write(str(productsInMachine))
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to open and write the money options file 🪙
# def openMoneyOptions():
#     with open('MoneyOptions.txt', 'r') as machineMoney:
#         return (machineMoney.read().strip())
   

#    TO BE DONE ⛔

# def changeProductsInMachine(result, moneyEnteredList):
#     for eachMoney in moneyEnteredList:        
#         result[eachMoney]['cuantity'] = result[eachMoney]['cuantity'] + moneyEnteredList[eachMoney]    
#     with open('moneyInMachineInitial.txt', 'w') as machineMoney:
#         machineMoney.write(str(result))
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------



# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to Check the money entered
def moneyEntered(clientMoney):
    if clientMoney >= productsInMachineInitial[product]["price"]:
       moneyBack = clientMoney - productsInMachineInitial[product]["price"]
       print(f'Thank you for purchasing {productsInMachineInitial[product]["product"]}')
       if moneyBack != 0:
           print("The money back is: " + str(moneyBack)+'$')
       else:
           print('Exact amount has been given. No money Back.')

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


dineroInMachineInitial= eval(openMoneyinMachineFunction())
productsInMachineInitial= eval(openProductsinMachineFunction())
# moneyOptions= eval(openMoneyOptions())

print ("{:<8} {:<15} {:<8}{:<8} ".format('Number','Product','Price','Cuantity'))
for i in productsInMachineInitial:
    print("{:<8} {:<15} {:<8} {:<8}".format(i, productsInMachineInitial[i]['product'], str(productsInMachineInitial[i]['price']),str(productsInMachineInitial[i]['cuantity']) ))
product = float(input("What product do you want? "))
print('----------------------------------------')
while product > len(productsInMachineInitial):
    product = float(input("Please, select a product in the list. What product do you want? "))
    print('----------------------------------------')
productSelected(product)

