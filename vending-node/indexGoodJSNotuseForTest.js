

// fetch('./products.json')
//     .then((response) => response.json())
//     .then((productsJSON) => console.log(productsJSON));

// productsJSON[3]={
//     "name":"Chips",
//     "value":0.50,
//     "cuantity":5
// }

// console.log(productsJSON)



async function getData() {
  const url = "./products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    editJSONData(json);
  } catch (error) {
    console.error(error.message);
  }
}

function editJSONData(json){
  json[3]={
      "name":"Chips",
      "value":0.50,
      "cuantity":5
  }
  console.log(json);

}


getData()









const buttonsNumber = document.getElementsByClassName('myButtonNumber')
const buttonsMoney = document.getElementsByClassName('myButtonMoney')
let customerProductNumber = '';
let productSelectedNumber = '';
let customerProductMoneyEntered ='';
const enterButton = document.getElementsByClassName('myButtonEnterCancel')[0]
const cancelButton = document.getElementsByClassName('myButtonEnterCancel')[1]
const enterMoneyButton = document.getElementsByClassName('myButtonEnterCancel')[0]
const cancelMoneyButton = document.getElementsByClassName('myButtonEnterCancel')[1]



for (i = 0; i < buttonsNumber.length; i++){
  buttonsNumber[i].addEventListener('click', function() {
    let buttonValue = this.value;
    customerProductNumber = customerProductNumber + buttonValue;
    console.log('Customer Product Number:', customerProductNumber);
    screenDataBeforeSelect(customerProductNumber)

  });
}




cancelButton.addEventListener('click', function() {
    customerProductNumber = '';
    console.log('customerProductNumber Had been cancelled')
    screenDataBeforeSelect(customerProductNumber)
    document.getElementById('screen-input').value =''

});

enterButton.addEventListener('click', function(){
  productSelectedNumber = Number(customerProductNumber);
  customerProductNumber = "";
  console.log('Product Selected Number:', productSelectedNumber);
  document.getElementById('buttons-number').hidden = true
  document.getElementById('buttons-money').hidden = false
  screenDataSelectedProduct(productSelectedNumber)
  return productSelectedNumber;
})

const productsToBeSelected = document.getElementsByClassName('product')

function screenDataSelectedProduct(productSelectedNumber){

  if (productSelectedNumber){
    productSelectedNumber -= 1
    let products = document.querySelectorAll('.product')[productSelectedNumber];
    let productSelected = products.dataset.name;
    let productCost = products.dataset.value;
    products.dataset.cuantity -=  1;
    let productCuantity = products.dataset.cuantity;
    document.getElementById('screen-input').value =`You have selected;\n Product: ${productSelected}\nCost: ${productCost}$

Please Enter Money`
  for (i = 0; i < buttonsMoney.length; i++){
    buttonsMoney[i].addEventListener('click', function() {
      let buttonValue = Number(this.value);
      customerProductMoneyEntered = Number(customerProductMoneyEntered) + buttonValue;
      screenDataAfterSelect(customerProductMoneyEntered, productSelected, productCost)
    });
}
  }
}

function screenDataBeforeSelect(productSelectedNumber){
  document.getElementById('screen-input').value =`Number entered: ${productSelectedNumber}\n 
  Please click ✔ to select the product or ❌ to cancel`
}

function screenDataAfterSelect(customerProductMoneyEntered, productSelected, productCost){
  const returnMoney = (productCost - customerProductMoneyEntered).toFixed(2)
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`You have selected;\n Product: ${productSelected}\nCost: ${productCost}$

  Money Entered: ${customerProductMoneyEntered}
  
  Left ${returnMoney}$`

  if (customerProductMoneyEntered >= productCost){
    change(customerProductMoneyEntered, productCost)
  }

}

function change(customerProductMoneyEntered, productCost){
  let change = (customerProductMoneyEntered - productCost).toFixed(2);
  document.getElementById('screen-input').value =document.getElementById('screen-input').value =`Thank you for the purchase.\n 
  
  The money back is ${change}$`
  document.getElementById('buttons-number').hidden = false
  document.getElementById('buttons-money').hidden = true
  
  const eachButtonNumber  = document.getElementsByClassName('myButtonNumberDisabled');
  console.log(eachButtonNumber)
  
  for (i = 0; i < eachButtonNumber.length; i++){
      eachButtonNumber[i].disabled = true;

  }
  setTimeout(()=>{
    document.getElementById('screen-input').value ="";
    for (i = 0; i < eachButtonNumber.length; i++){
      eachButtonNumber[i].disabled = false;
  }
  },"5000")

}





console.log(document.getElementById('screen-input').value)
