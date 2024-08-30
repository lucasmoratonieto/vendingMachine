import os

productsInMachine = {
    1:{
        "product":"Chips",
        "price":1
    },
    2:{
       "product":"Chocolate",
       "price":3
    },
    3:{
       "product":"Bread",
       "price":1.5        
    }
}

moneyOptionForClientEntered = {
    1:100,
    2:10,
    3:1,
    4:0
}

def productSelected(clientSelection):
    currentMoneyEntered=0
    print('You have selected: '+ productsInMachine[clientSelection]["product"] + ". \nThe price of the product is: " + str(productsInMachine[clientSelection]["price"]) + "$.")
    print('Please enter option:')
    print('1. 100 dollars')
    print('2. 10 dollars')
    print('3. One dollar')
    print('4. End')
    moneyEnteredByClient = int(input("Enter Money "))
    print(moneyOptionForClientEntered[moneyEnteredByClient])
    while moneyEnteredByClient != 4:
            currentMoneyEntered += int(moneyOptionForClientEntered[moneyEnteredByClient])
            print(f'Current money entered is: {currentMoneyEntered} ')
            moneyEnteredByClient = int(input('Please next option:'))
            

    moneyEntered(currentMoneyEntered, clientSelection)
    
    return

# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to Check the money entered
def moneyEntered(clientMoney, clientSelection):
    global dineroInMachineInitial
    while clientMoney < productsInMachine[product]["price"]:
        print("Please enter more money, the value of the " +productsInMachine[clientSelection]["product"] + ' is '+ str(productsInMachine[clientSelection]["price"]))
        # moneyEntered(clientMoney, clientSelection)
        clientMoney = int(input("Enter Money "))

    if clientMoney >= productsInMachine[product]["price"]:
       moneyBack = clientMoney - productsInMachine[product]["price"]
       print(f'Thank you for purchasing {productsInMachine[product]["product"]}')
       print("The money back is: " + str(moneyBack)+'$')

    #    dineroInMachineInitial += productsInMachine[product]["price"]    
    #    changeMoneyInMachine(dineroInMachineInitial)
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------
# Function to open and write the money file
def openMoneyinMachineFunction():
    with open('moneyInMachineInitial.txt', 'r') as machineMoney:
        return (machineMoney.read().strip())
   
def changeMoneyInMachine(result):
    with open('moneyInMachineInitial.txt', 'w') as machineMoney:
        machineMoney.write(str(result))
# -------------------------------------------------------------------------------
# -------------------------------------------------------------------------------

dineroInMachineInitial= eval(openMoneyinMachineFunction())


product = int(input("What product do you want? "))
productSelected(product)

