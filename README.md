# Vending Machine Application 

This project is a Vending Machine Application built with Node.js, JavaScript, HTML, and CSS. The application enables users to browse available products, select an item to purchase, and make a payment, while the system dynamically updates product quantities in real-time by interacting with a SQL database.

##Features
Product Selection: Users can view a list of available products, each displaying essential information like product name, price, and remaining stock.

Payment Processing: Once a product is selected, users can proceed with payment. The application handles basic payment flow, allowing users to complete their purchase seamlessly.

Inventory Management: After each successful transaction, the application updates the SQL database to reflect the new product quantity, ensuring that the displayed stock is always accurate.

##Technical Stack
Backend: Built with Node.js to handle requests and manage database interactions. The server uses SQL queries to retrieve, update, and manage product data.

Frontend: Developed using HTML, CSS, and JavaScript to create a user-friendly interface. JavaScript enables the interactive aspects, including selecting products and handling client-server communication.

Database: SQL database that stores product information, including product ID, name, price, and quantity. The application executes SQL queries to retrieve product data, validate transactions, and update stock levels after each purchase.
## Authors

- [@LucasMoratoNieto](https://github.com/lucasmoratonieto)


## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/vending-machine-app.git
cd vending-machine-app
```

2. Install dependencies:

``` bash
npm install
```

3. Configure the .env file with your turso database credentials:
``` 
DB_URL: Your URL
DB_TOKEN = Your Token
```
    
4. Start the application:

```
node --watch node.js
```
