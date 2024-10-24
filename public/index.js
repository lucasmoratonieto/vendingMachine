//Put the JSON into the machine as products.
function htmlJSONCall() {
  console.log('fetch')
    const luList = document.querySelectorAll('ul')
    const producto = document.getElementsByClassName('product')
    if(producto[0]){
      console.log(producto)
      const productArray = Array.from(producto)
      console.log(productArray)
      productArray.forEach(function(eachproducto) {
        // console.log(eachproducto)
        eachproducto.remove()
      });
    }
    if (producto[0] != undefined ) {
      for (let i = 0; i < producto.length; i++){
        console.log('each product', producto[i])
        producto[0].remove()
        
      }
    }
    fetch('../machineProducts.json')
      .then(res => res.json())
      .then(data =>{
        // console.log(data[1].product)
        for (let i = 1; i <= Object.keys(data).length; i++){
          const eachProductLIP = document.createElement('li');
          const eachProductLIPL = document.createElement('div');
          eachProductLIP.textContent = `${data[i].product} `
          eachProductLIPL.textContent = `${data[i].price}$ left: ${data[i].cuantity}`
          luList[0].appendChild(eachProductLIP)
          eachProductLIP.classList.add('product')
          eachProductLIP.appendChild(eachProductLIPL)
          eachProductLIPL.classList.add('product-specifications')
        }
      })
      .catch(err => console.log(err))    
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
const baseUrl = 'http://localhost:2500/'



// Function so each button appear in the screen. Also call for the function to change the screen.
for (i = 0; i < buttonsNumber.length; i++){
  buttonsNumber[i].addEventListener('click', function() {
    let buttonValue = this.value;
    customerProductNumber = customerProductNumber + buttonValue;
    // console.log('Customer Product Number:', customerProductNumber);
    console.log('Calling screenDataBeforeSelect') 
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
    console.log('Calling screenDataSelectedProduct') 
    screenDataSelectedProduct(productSelectedNumber)
  }
})


//CREO QUE EL PROBLEMA ESTÁ EN ESTA FUNCIÓN.
// Function to change what is in the screen. Also it takes the value of the html to check the price and the name of the product. Now it is using node to fetch all the info.
function screenDataSelectedProduct(productSelectedNumber){
  console.log('Starting screenDataSelectedProduct') 
  getProducts()
  async function getProducts(e) {
  console.log('Starting screenDataSelectedProduct GetPart') 
    const res = await fetch(baseUrl + 'products',
      {
        method:'GET'
      }
    )

    data = await res.json()
    console.log(data[productSelectedNumber])
    let productSelected = data[productSelectedNumber].product;
    let productCost = data[productSelectedNumber].price;
  console.log('Starting screenDataSelectedProduct beforeGetPart') 

    document.getElementById('screen-input').value =`You have selected;\n Product: ${productSelected}\nCost: ${productCost}$

    Please Enter Money`
    for (i = 0; i < buttonsMoney.length; i++){
      buttonsMoney[i].addEventListener('click', function() {
        let buttonValue = Number(this.value);
        customerProductMoneyEntered = Number(customerProductMoneyEntered) + buttonValue;
        console.log('Calling screenDataAfterSelect') 
        screenDataAfterSelect(customerProductMoneyEntered,productSelectedNumber, productSelected, productCost)

        if (customerProductMoneyEntered >= productCost){
          customerProductMoneyEntered = 0
          console.log('Calling change')
          change(customerProductMoneyEntered,productSelectedNumber, productCost)
        }
      });
    }

  }
}

//Esta función lo que hace es ir actualizando la pantalla con cada número que se pulsa. Pero tmb llama a la función change más de una vez. Por que 
// la función anterior esta en un bucle llamando a screenDataAfterSelect.

// Hay que dejar el bucle para que la pantalla se vaya actualizando, pero que la función de la pantalla no sea la que llama a la función de change.
function screenDataAfterSelect(moneyEntered, productSelectedNumber, selectedProduct, priceProduct){

  const returnMoney = (priceProduct - moneyEntered).toFixed(2)
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`You have selected;\n Product: ${selectedProduct}\nCost: ${priceProduct}$

  Money Entered: ${moneyEntered}

  Left ${returnMoney}$`

    // Esta parte está comentada por que cuando eliges el segundo producto se ejecuta dos veces, voy a subirla a la función de arriba.
  // if (moneyEntered >= priceProduct){
  //   console.log('Calling change')
  //   change(moneyEntered,productSelectedNumber, priceProduct)
  //   return
  // }

}


function change(moneyEnteredChange, productSelectedNumber, priceProductChange){
  console.log('productSelectedNumber: ' + productSelectedNumber)
  console.log('Calling post')
  postProducts(productSelectedNumber)
  let change = (moneyEnteredChange - priceProductChange).toFixed(2);
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`Thank you for the purchase.\n
  
  The money back is ${change}$`
  document.getElementById('buttons-number').hidden = false
  document.getElementById('buttons-money').hidden = true
  change = 0
  console.log('Calling fetch')
  htmlJSONCall()
  disableChangeButtons()
  
}

async function postProducts(productSelectedNumber) {
  console.log('Post')
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