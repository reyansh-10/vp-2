//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;

function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  d1=createSprite(800,200,150,150);
  d1.addImage(dog);
  d1.scale=0.15;
 
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  

  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :" + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30); 
  }else{
    text("Last Feed :" + lastFed + "AM",350,30);
  }
  drawSprites();
}
function feedDog(){
  d1.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}




