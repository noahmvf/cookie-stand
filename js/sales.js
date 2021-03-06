'use strict';

var hour = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

////CREATE TABLE AND THEAD ELEMENTS
var table = document.getElementById('sales-table');
var shopArray = [];
var shopForm = document.getElementById('shop-form');

////CONSTRUCTOR FUNCTION FOR TABLE
function cookieShop(location, minCust, maxCust, avgCkSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCkSale = avgCkSale;
  this.salesTotal = 0;
  this.salesArray = [];
  shopArray.push(this);
}

////PROTOTYPE FUNCTION INHERITED BY CONSTRUCTOR
cookieShop.prototype.render = function() {
  //we want our function to push sales at each hour into our shopArray
  var min = this.minCust;
  var max = this.maxCust;
  
  var trElement = document.createElement('tr');
  var trLocation = document.createElement('td');
  trLocation.textContent = this.location;
  trElement.appendChild(trLocation);
 
  //creating the table row that we will input our location and sales data at each hour

  for (var i = 0; i < hour.length; i++) {
    var randomCustNum = Math.floor(Math.random() * (max - min + 1) + min);
    var avg = this.avgCkSale;
    var cookieNum = Math.round(randomCustNum*avg);
    // console.log(cookieNum);
    
    this.salesArray.push(cookieNum);
    //we are pushing a value into constructor array
   
    this.salesTotal += cookieNum;
    //pushing the shop into our global var

  var rowElement = document.createElement('td');
  rowElement.textContent = cookieNum;
  trElement.appendChild(rowElement);
  }
  var trTotal = document.createElement('td');
  trTotal.textContent = this.salesTotal;
  trElement.appendChild(trTotal);

  table.appendChild(trElement);
  // table.appendChild(hourlyTotalRow);
};

new cookieShop('First and Pike', 23, 65, 6.3);
new cookieShop('Seatac', 3, 24, 1.2);
new cookieShop('Seattle Center', 11, 38, 3.7);
new cookieShop('Alki', 2, 16, 4.6); 

////TABLE FOOTER WITH HOURLY SALES TOTALS

function makeFooterTotals() {
  //I want a sum of each shop's sales at each hour
  var footerRow = document.createElement('tr');
  var totalString = document.createElement('td');
  totalString.textContent = 'Total';
  footerRow.appendChild(totalString);
  
  for (var i = 0; i < hour.length; i++) {
    var sum = 0;
    for (var j = 0; j < shopArray.length; j++) {
      sum += shopArray[j].salesArray[i];
    }
 
  var tableData = document.createElement('td');
  tableData.textContent = sum;
  footerRow.appendChild(tableData);

 
  }
  var total = 0;
  for (var k in sum) {
    total += sum[k];
  }
  var totes = document.createElement('td');
  totes.textContent = total;
  footerRow.appendChild(totes);
  table.appendChild(footerRow);
}



//nested for loop
//the outer for loop will iterate over teh hours array
//the inner for loop will iterate over the stores array


////FUNCTION TO MAKE THE HEADER ROW OF HOURS
function makeHoursHeader() {
  var headerRow = document.createElement('tr');
  
  var locationData = document.createElement('th');
  locationData.textContent = 'Location';
  headerRow.appendChild(locationData);

  for (var i = 0; i < hour.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = hour[i];
    headerRow.appendChild(thElement);
  }

  var totalsHeader = document.createElement('th');
  totalsHeader.textContent = 'Totals';
  headerRow.appendChild(totalsHeader);
  
  table.appendChild(headerRow);
}

//FUNCTION TO RENDER ALL SHOPS
function renderShops() {
  for (var i in shopArray) {
    shopArray[i].render();
  }
}

////FUNCTION TO ADD A NEW SHOP THROUGH A FORM
function addShop(event) {
  event.preventDefault();

  var newLocation = event.target.location.value;
  var newMin = parseInt(event.target.minCustomers.value);
  var newMax = parseInt(event.target.maxCustomers.value);
  var newAvg = parseInt(event.target.avgCookies.value);
  //these are the values for what we want in our form

  new cookieShop(newLocation, newMin, newMax, newAvg);
  //variable for our new input and specifying the variables for each value

  table.innerHTML = ''; // we are now selecting our global 'table' variable from the top of our page and clearing its contents

  makeHoursHeader();
  renderShops();
  makeFooterTotals();
}

shopForm.addEventListener('submit', addShop);

makeHoursHeader();
renderShops();
makeFooterTotals();