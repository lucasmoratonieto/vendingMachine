import os

productsInMachine = {
    1:{
        "product":"Chips",
        "price":200
    },
    2:{
       "product":"Chocolate",
       "price":3
    },
    3:{
       "product":"Bread",
       "price":1.5        
    },
     4:{
       "product":"Water",
       "price":5
    }
}

moneyOptionForClientEntered = {
    1:{
        'value':100,
        'name':'billete100'
        },
    2:{
        'value':10,
        'name':'billete10'
        },
    3:{
        'value':5,
        'name':'billete5'
    },
    4:{
        'value':1,
        'name':'monedaUno'
    }
}

def productSelected(clientSelection):
    global dineroInMachineInitial
    currentMoneyEntered=0
    moneyUsedByClient={}
    print('You have selected: '+ productsInMachine[clientSelection]["product"] + ". \nThe price of the product is: " + str(productsInMachine[clientSelection]["price"]) + "$.")
    print('Please enter option:')
    print('1. 100 dollars')
    print('2. 10 dollars')
    print('3. 5 dollars')
    print('4. One dollar')
    moneyEnteredByClient = int(input("Enter Money "))
    moneyUsedByClient[moneyOptionForClientEntered[moneyEnteredByClient]['name']] = 1
    print('----------------------------------------')
    while currentMoneyEntered < productsInMachine[clientSelection]["price"]:
            currentMoneyEntered += int(moneyOptionForClientEntered[moneyEnteredByClient]['value'])
            print(f'Current money entered is: {currentMoneyEntered}$')
            print('----------------------------------------')
            

            if currentMoneyEntered < productsInMachine[clientSelection]["price"]:
                print(f'Please select next option, more money needed, the price of the product is {productsInMachine[clientSelection]["price"]}$')
                moneyEnteredByClient = int(input(f'Money remaining: {productsInMachine[clientSelection]["price"] - currentMoneyEntered }$:'))
                print('----------------------------------------')
                if moneyOptionForClientEntered[moneyEnteredByClient]['name'] in moneyUsedByClient:
                    moneyUsedByClient[moneyOptionForClientEntered[moneyEnteredByClient]['name']] = moneyUsedByClient[moneyOptionForClientEntered[moneyEnteredByClient]['name']] + 1
                else:
                    moneyUsedByClient[moneyOptionForClientEntered[moneyEnteredByClient]['name']] = 1


    changeMoneyInMachine(dineroInMachineInitial,moneyUsedByClient )
    moneyEntered(currentMoneyEntered, moneyUsedByClient)
    



# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to open and write the money file
def openMoneyinMachineFunction():
    with open('moneyInMachineInitial.txt', 'r') as machineMoney:
        return (machineMoney.read().strip())
   
def changeMoneyInMachine(result, moneyEnteredList):
    for eachMoney in moneyEnteredList:        
        result[eachMoney]['cuantity'] = result[eachMoney]['cuantity'] + moneyEnteredList[eachMoney]    
    with open('moneyInMachineInitial.txt', 'w') as machineMoney:
        machineMoney.write(str(result))
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to Check the money entered
def moneyEntered(clientMoney, moneyUsedByClient):
    if clientMoney >= productsInMachine[product]["price"]:
       moneyBack = clientMoney - productsInMachine[product]["price"]
       print(f'Thank you for purchasing {productsInMachine[product]["product"]}')
       if moneyBack != 0:
           print("The money back is: " + str(moneyBack)+'$')
       else:
           print('Exact amount has been given. No money Back.')

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


dineroInMachineInitial= eval(openMoneyinMachineFunction())
print ("{:<5} {:<15} {:<15} ".format('Number','Product','Price'))
for i in productsInMachine:
    print("{:<5} {:<15} {:<15} ".format(i, productsInMachine[i]['product'], str(productsInMachine[i]['price'])))
product = int(input("What product do you want? "))
print('----------------------------------------')
while product > len(productsInMachine):
    product = int(input("Please, select a product in the list. What product do you want? "))
    print('----------------------------------------')
productSelected(product)

