//Put the JSON into the machine as products.
function htmlJSONCall() {
    const luList = document.querySelectorAll('ul')
    const producto = document.getElementsByClassName('product')
    if(producto[0]){
  
      const productArray = Array.from(producto)
  
      productArray.forEach(function(eachproducto) {
    
        eachproducto.remove()
      });
    }
    if (producto[0] != undefined ) {
      for (let i = 0; i < producto.length; i++){
    
        producto[0].remove()
        
      }
    }
    fetch('../machineProducts.json')
      .then(res => res.json())
      .then(data =>{
    
        for (let i = 1; i <= Object.keys(data).length; i++){
          const eachProductLIP = document.createElement('li');
          const eachProductLIPL = document.createElement('div');
          eachProductLIP.textContent = `${i}. ${data[i].product} `
          eachProductLIPL.textContent = `${data[i].price}$ left: ${data[i].cuantity}`
          luList[0].appendChild(eachProductLIP)
          eachProductLIP.classList.add('product')
          eachProductLIP.appendChild(eachProductLIPL)
          eachProductLIPL.classList.add('product-specifications')
        }
      })
  
  }

htmlJSONCall()


  
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
const baseUrl = 'http://localhost:2400/'

// Function so each button appear in the screen. Also call for the function to change the screen.
for (i = 0; i < buttonsNumber.length; i++){
  buttonsNumber[i].addEventListener('click', function() {
    let buttonValue = this.value;
    customerProductNumber = customerProductNumber + buttonValue;


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
    productSelectedNumber = Number(customerProductNumber) - 1;
    customerProductNumber = "";

    document.getElementById('buttons-number').hidden = true
    document.getElementById('buttons-money').hidden = false

    screenDataSelectedProduct(productSelectedNumber)
  }
})



// Function to change what is in the screen. Also it takes the value of the html to check the price and the name of the product. Now it is using node to fetch all the info.
let avoidEnteringInCreateClickFunction = 1
function screenDataSelectedProduct(productSelectedNumber){
  getProducts()

  async function getProducts(e) {
      console.log(productSelectedNumber)

    const res = await fetch(baseUrl + 'products',
      {
        method:'GET'
      }
    )

    data = await res.json()
    console.log(data)

     productNumber = data[productSelectedNumber].productNumber;
     productSelected = data[productSelectedNumber].productName;
     productCost = data[productSelectedNumber].productPrice;

      if(data[productSelectedNumber].cuantity < 1){
        document.getElementById('screen-input').value = `We have run out of ${productSelected}. Please, select an other one.`
        for (i = 0; i < allButtons.length; i++){
          allButtons[i].disabled = true
        }
        setTimeout(()=>{
          document.getElementById('screen-input').value = ""
          for (i = 0; i < allButtons.length; i++){
            allButtons[i].disabled = false
            document.getElementById('buttons-number').hidden = false
            document.getElementById('buttons-money').hidden = true
          }
        },3000)
      }else {

        document.getElementById('screen-input').value =`You have selected;\n Product: ${productSelected}\nCost: ${productCost}$
    
        Please Enter Money`
    
        if (avoidEnteringInCreateClickFunction === 1){
    
          for (i = 0; i < buttonsMoney.length; i++){
            buttonsMoney[i].addEventListener('click', functionButtonsMoney);
        
          }
        }
        
        avoidEnteringInCreateClickFunction = avoidEnteringInCreateClickFunction + 1
        
        function functionButtonsMoney() {
          let buttonValue = Number(this.value);
          customerProductMoneyEntered = Number(customerProductMoneyEntered) + buttonValue;
          console.log()
          
          screenDataAfterSelect(customerProductMoneyEntered, productSelected, productCost)
      
          // change(customerProductMoneyEntered, , productCost)
    
          if (customerProductMoneyEntered >= productCost){
        
        
            change(customerProductMoneyEntered, productCost)
            customerProductMoneyEntered = 0
          } else{
        
          }
        };
      }

    

  }
}

//Esta función lo que hace es ir actualizando la pantalla con cada número que se pulsa. Pero tmb llama a la función change más de una vez. Por que 
// la función anterior esta en un bucle llamando a screenDataAfterSelect.

// Hay que dejar el bucle para que la pantalla se vaya actualizando, pero que la función de la pantalla no sea la que llama a la función de change.
function screenDataAfterSelect(moneyEntered,selectedProduct, priceProduct){

  const returnMoney = (priceProduct - moneyEntered).toFixed(2)
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`You have selected;\n Product: ${selectedProduct}\nCost: ${priceProduct}$

  Money Entered: ${moneyEntered}

  Left ${returnMoney}$`
  return
}


function change(moneyEnteredChange, priceProductChange){
  postProducts()
  let change = (moneyEnteredChange - priceProductChange).toFixed(2);
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`Thank you for the purchase.\n
  
  The money back is ${change}$`
  document.getElementById('buttons-number').hidden = false
  document.getElementById('buttons-money').hidden = true
  change = 0
  setTimeout(() =>{
    htmlJSONCall()
  },500)
  disableChangeButtons()
  
}

async function postProducts() {
  console.log('This is the product selected numner ',productSelectedNumber)
  const req = await fetch(baseUrl,
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
}


function disableChangeButtons(){
  const eachButtonNumber  = document.getElementsByClassName('myButtonNumberDisabled');
  for (i = 0; i < eachButtonNumber.length; i++){
    eachButtonNumber[i].disabled = true;
    setTimeout(()=>{
      document.getElementById('screen-input').value ="";
      for (i = 0; i < eachButtonNumber.length; i++){
        eachButtonNumber[i].disabled = false;
      }
    },"4000")
  }
}