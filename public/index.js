//Put the JSON into the machine as products.
htmlJSONCall()
const lisEl = document.querySelectorAll('ul')
function htmlJSONCall() {
  const lista = document.getElementById('lista-productos')
  lista.innerHTML = ''
  
  fetch('../machineProducts.json')
    .then(res => res.json())
    .then(data =>{
      // console.log(data[1].product)
      for (let i = 1; i <= Object.keys(data).length; i++){
        const eachProductLIP = document.createElement('li');
        const eachProductLIPL = document.createElement('div');
        eachProductLIP.textContent = `${data[i].product} `
        eachProductLIPL.textContent = `${data[i].price}$ left: ${data[i].cuantity}`
        lisEl[0].appendChild(eachProductLIP)
        eachProductLIP.classList.add('product')
        eachProductLIP.appendChild(eachProductLIPL)
        eachProductLIPL.classList.add('product-specifications')
      }
    })
    .catch(err => console.log(err))
}



// Const of the buttons
const buttonsNumber = document.getElementsByClassName('myButtonNumber')
const buttonsMoney = document.getElementsByClassName('myButtonMoney')
const enterButton = document.getElementsByClassName('myButtonEnterCancel')[0]
const cancelButton = document.getElementsByClassName('myButtonEnterCancel')[1]
const enterMoneyButton = document.getElementsByClassName('myButtonEnterCancel')[0]
const cancelMoneyButton = document.getElementsByClassName('myButtonEnterCancel')[1]
const allButtons = document.querySelectorAll('button')

let customerProductNumber = '';
let productSelectedNumber = '';
let customerProductMoneyEntered ='';


// La url que habría que cambiar cuando se genera la base de datos
const baseUrl = 'http://localhost:2500/'



// Function so each button appear in the screen. Also call for the function to change the screen.
for (i = 0; i < buttonsNumber.length; i++){
  buttonsNumber[i].addEventListener('click', function() {
    let buttonValue = this.value;
    customerProductNumber = customerProductNumber + buttonValue;
    // console.log('Customer Product Number:', customerProductNumber);
    screenDataBeforeSelect(customerProductNumber)
  });
}

// Function to cancel what you have order 
cancelButton.addEventListener('click', function() {
    customerProductNumber = '';
    document.getElementById('screen-input').value =''

});

// The value of the screen before clicking the okey button. It is called everytime a number is press.
function screenDataBeforeSelect(productSelectedNumberBeforeEnter){
  document.getElementById('screen-input').value =`Number entered: ${productSelectedNumberBeforeEnter}\n 
  Please click ✔ to select the product or ❌ to cancel`
}



// Funtion to enter the desiderd product with the enter button.
enterButton.addEventListener('click', function(){
  if(document.getElementById('screen-input').value == '' || document.getElementById('screen-input').value == 'Any product has been selected.'){
    document.getElementById('screen-input').value = "Any product has been selected."
    for (i = 0; i < allButtons.length; i++){
      allButtons[i].disabled = true
    }
    setTimeout(()=>{
      document.getElementById('screen-input').value = ""
      for (i = 0; i < allButtons.length; i++){
        allButtons[i].disabled = false
      } 
    },1000)
  }else {
    productSelectedNumber = Number(customerProductNumber);
    customerProductNumber = "";
    console.log('Product Selected Number:', productSelectedNumber);
    document.getElementById('buttons-number').hidden = true
    document.getElementById('buttons-money').hidden = false
    screenDataSelectedProduct(productSelectedNumber)
  }
})



// Function to change what is in the screen. Also it takes the value of the html to check the price and the name of the product. Now it is using node to fetch all the info.
function screenDataSelectedProduct(productSelectedNumber){
  getProducts()
  async function getProducts(e) {
    const res = await fetch(baseUrl + 'products',
      {
        method:'GET'
      }
    )
    
    data = await res.json()
    console.log(data[productSelectedNumber])
    let productSelected = data[productSelectedNumber].product;
    let productCost = data[productSelectedNumber].price;

    document.getElementById('screen-input').value =`You have selected;\n Product: ${productSelected}\nCost: ${productCost}$
    
    Please Enter Money`
    for (i = 0; i < buttonsMoney.length; i++){
      buttonsMoney[i].addEventListener('click', function() {
        let buttonValue = Number(this.value);
        customerProductMoneyEntered = Number(customerProductMoneyEntered) + buttonValue;
        screenDataAfterSelect(customerProductMoneyEntered,productSelectedNumber, productSelected, productCost)
// -----------------------------------------------------------------TO Reviwed ------------------------------------------------------------------------------------------
        if (customerProductMoneyEntered >= productCost){
          customerProductMoneyEntered = 0
        }        
      });
    }
  }
}






function screenDataAfterSelect(moneyEntered, productSelectedNumber, selectedProduct, priceProduct){
  
  const returnMoney = (priceProduct - moneyEntered).toFixed(2)
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`You have selected;\n Product: ${selectedProduct}\nCost: ${priceProduct}$
  
  Money Entered: ${moneyEntered}
  
  Left ${returnMoney}$`
  
  if (moneyEntered >= priceProduct){
    change(moneyEntered,productSelectedNumber, priceProduct)
  }

}


function change(moneyEnteredChange, productSelectedNumber, priceProductChange){  
  console.log('productSelectedNumber: ' + productSelectedNumber)
  postProducts()
  async function postProducts(e) {
    const res = await fetch(baseUrl,
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({
          product:data[productSelectedNumber]
        })
      }
    )
    let change = (moneyEnteredChange - priceProductChange).toFixed(2);
    document.getElementById('screen-input').value =document.getElementById('screen-input').value =`Thank you for the purchase.\n 
    
    The money back is ${change}$`
    document.getElementById('buttons-number').hidden = false
    document.getElementById('buttons-money').hidden = true
    
    const eachButtonNumber  = document.getElementsByClassName('myButtonNumberDisabled');
    
    
    for (i = 0; i < eachButtonNumber.length; i++){
        eachButtonNumber[i].disabled = true;
  
    }
    setTimeout(()=>{
      document.getElementById('screen-input').value ="";
      for (i = 0; i < eachButtonNumber.length; i++){
        eachButtonNumber[i].disabled = false;
    }
  },"5000")
  change = 0
}
// Ithink that this part is not working, it call two times and repeates the info.
  htmlJSONCall()

}
