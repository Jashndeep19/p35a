var food
var doggy,dog,happyDog,foods,database,foodstock
var feed,addfood
var fedTime, lastFed 

function preload()
{
  dog = loadImage("images/dog.png");
  happyDog = loadImage("images/happyDog.png");
}

 function setup(){ 
 database=firebase.database(); 
 createCanvas(500,500);
 doggy=createSprite(250,300,150,150);
 doggy.addImage(dog);
 doggy.scale=0.15;
 food=new Food(0,0);
 foodstock=database.ref('food');
 foodstock.on("value",readStock); 
 feed = createButton("Feed your dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 }


function draw() {  
background(46, 139, 87)

food.display();

fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val(); });
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12) {
 text("Last Feed: " + lastFed%12 + "PM", 350, 30);
  }  else if (lastFed === 0) {
    text("Last Feed: 12 AM", 350, 30);
  }  else {
    text("Last Feed: " + lastFed + "AM" , 350, 30);
  }
drawSprites();


}
function feedDog() {
dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour() })
 }
function addFoods() {
foodS++;
database.ref('/').update({
Food:foodS })
}
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
    }
    database.ref('/').update({
      food:x
    })
  }

 function readStock(data){
    foods=data.val(); 
  }
