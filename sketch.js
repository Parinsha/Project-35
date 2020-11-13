//Create variables here
var database;
var dog, dogImg, happyDog, foodS, foodStock, foodObject;
var feed, AddFood;
var lastFed

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() 
{
  //creating canvas
  createCanvas(1000, 500);
  //assigning firebase database to variable database
  database = firebase.database();
  //creating food object
  foodObject = new Food();
  //getting food stock from database
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  //creating dog, adding image to dog, scaling dog  
  dog = createSprite(500,250);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  //creating feed button
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  //creating addFood button
  AddFood = createButton("Add Food");
  AddFood.position(800,95);
  AddFood.mousePressed(addFood);
}


function draw() 
{  
  //creating background
  background(46, 139, 87);
  //add styles here
  fill(255);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val()
  })

  if(lastFed >= 12)
  {
    text("Last Feed : " + lastFed%12 + " PM", 350, 60); 
  }else if(lastFed==0)
  { 
    text("Last Feed : 12 AM",350,30); 
  }
    else
    { 
      text("Last Feed : "+ lastFed + " AM", 350, 60); 
    }

  foodObject.display();

  //drawing sprites
  drawSprites();
}
//function to read values from database
function readStock(data)
{
  foodcount = data.val();
  console.log(foodcount);
  foodObject.foodStock = foodcount;
}
//function to write values in database
function writeStock(x)
{
  if(count < 0)
  {
    count = 0;
  }
  else
  {
    database.ref('/').update({food:count})
  }
}
//function to read time
function readtime(data)
{
  lastFedtime = data.val();
  foodObject.fedtime = lastFedtime;
  console.log(lastFedtime);
}
//function to update food stock and last fed time
function feedDog()
{
  dog.addImage(happyDog);

  foodObject.foodStock--;
  database.ref('/').update({
    Food : foodObject.foodStock,
    FeedTime : hour()
  })
}
//function to add food in stock
function addFood()
{
  dog.addImage(dogImg);
  foodObject.foodStock++;
  database.ref('/').update({
    Food : foodObject.foodStock
  })
}



