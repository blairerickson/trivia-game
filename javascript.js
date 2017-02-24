
//  Trivia code section


var images = ["http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/people/"];

var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

$("#begin").click(startSlideshow);
$("#stop").click(stopSlideshow);


$("#questionbox").html("TEST QUESTION FOR QUESTION BOX.");


 var queryURL = "https://www.opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple"


   $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

    });


// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {
  $("#image-holder").html("<img src=" + images[count] + " width='400px'>");
}

function nextImage() {
  //  TODO: Increment the count by 1.
  count++;

  // TODO: Show the loading gif in the "image-holder" div.
  $("#image-holder").html("<img src='images/loading.gif' width='200px'/>");

  // TODO: Use a setTimeout to run displayImage after 5 seconds.
  setTimeout(displayImage, 1000);

  // TODO: If the count is the same as the length of the image array, reset the count to 0.
  if (count === images.length) {
    count = 0;
  }
}

function startSlideshow() {

  // TODO: Use showImage to hold the setInterval to run nextImage.
  showImage = setInterval(nextImage, 5000);

}

function stopSlideshow() {

  // TODO: Put our clearInterval here:
  clearInterval(showImage);

}

// This will run the display image function as soon as the page loads.
displayImage();



// particle clock

var ctx;
var stage;
var stageWidth;
var stageHeight;
var particles = [];
var particleCount = 850;
var speed = 0.3;
var cull = 3;
var r = 0;

function init(){
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  stage = new createjs.Stage(canvas);

  for(var i = 0; i < particleCount; i++){
    var color = "rgba("+_.random(64)+","+_.random(32,192)+",255,1)";
    var radius = Math.floor(Math.random()*10)/10 + 0.5;
    var x = 0;
    var y = 0;
    var vx = (1 - Math.random()*2);
    var vy = (1 - Math.random()*2);
    var vx2 = (1 - Math.random()*2)*0.1;
    var vy2 = (1 - Math.random()*2)*0.1;

    var particle = createParticle(color, radius, x, y, vx, vy, vx2, vy2);
    particles.push(particle);
    stage.addChild(particle);
  }

  resize();
  clock();
}

init();

function createParticle(color, radius, x, y, vx, vy, vx2, vy2){
  var particle = new createjs.Shape();
  particle.graphics.beginFill(color);
  particle.graphics.drawCircle(0,0,radius);
  particle.x = x;
  particle.y = y;
  particle.endX = x;
  particle.endY = y;
  particle.vx = vx;
  particle.vy = vy;
  particle.vx2 = vx2;
  particle.vy2 = vy2;

  return particle;
}

function clock(){
  var date = new Date();
  var h = (date.getHours() > 9) ? date.getHours() : "0"+date.getHours();
  var m = (date.getMinutes() > 9) ? date.getMinutes() : "0"+date.getMinutes();
  var s = (date.getSeconds() > 9) ? date.getSeconds() : "0"+date.getSeconds();
  var time = h + " " + m + " " + s;

  var text = new createjs.Text(time,"85px Arial","#fff");
  text.w = Math.floor(text.getMeasuredWidth());
  text.h = Math.floor(text.getMeasuredLineHeight());
  text.x = Math.floor(stageWidth/2 - text.w/2);
  text.y = Math.floor(stageHeight/2 - text.h/2);

  var rect = new createjs.Shape();
  rect.graphics.beginFill("#000");
  rect.graphics.drawRect(0,0,stageWidth,stageHeight);

  stage.compositeOperation = "default";

  stage.addChild(rect);
  stage.addChild(text);
  stage.update();

  var pixels = ctx.getImageData(text.x,text.y,text.w,text.h);

  stage.removeChild(rect);
  stage.removeChild(text);
  stage.update();

  stage.compositeOperation = "lighter";

  var i = 0;
  for(var w = 0; w < text.w; w += cull){
    for(var h = 0; h < text.h; h += cull){
      if(pixels.data[(w+text.w*h)*4] !== 0 && i < particles.length){
        var particle = particles[i];

        particle.endX = text.x+w;
        particle.endY = text.y+h;
        particle.vx = (1 - Math.random()*2);
        particle.vy = (1 - Math.random()*2);
        scale = _.random(1,40);
        particle.scaleX = scale;
        particle.scaleY = scale;
        
        i++;
      }
    }
  }

  for(var j = i; j < particles.length; j++){
    var particle = particles[j];

    if(j < r){
      particle.endX = _.random(stageWidth);
      particle.endY = _.random(stageHeight);
    }
    scale = _.random(1,5);
    particle.scaleX = scale;
    particle.scaleY = scale;
  }
  r = i;

  setTimeout(clock, 1000);
}

function tick(){
  for(var i = 0; i < particleCount; i++){
    var particle = particles[i];

    if(i < r){
      particle.endX += 1 * particle.vx/10;
      particle.endY += 1 * particle.vy/10;
      v = 1.05 + Math.random()/100;
      particle.vx *= v;
      particle.vy *= v;
    }else{
      particle.endX += particle.vx2;
      particle.endY += particle.vy2;
    }

    if(particle.x < 0){
      particle.x = stageWidth;
      particle.endX = stageWidth;
    }else if(particle.x > stageWidth){
      particle.x = 0;
      particle.endX = 0;
    }

    if(particle.y < 0){
      particle.y = stageHeight;
      particle.endY = stageHeight;
    }else if(particle.y > stageHeight){
      particle.y = 0;
      particle.endY = 0;
    }

    particle.x = particle.x + (particle.endX - particle.x)*speed;
    particle.y = particle.y + (particle.endY - particle.y)*speed;

    if(particle.scaleX > 1) particle.scaleX = particle.scaleX*0.85;
    if(particle.scaleY > 1) particle.scaleY = particle.scaleY*0.85;
  }

  stage.update();
}

function resize(){
  $("#canvas").attr("width", $(window).width());
  $("#canvas").attr("height", $(window).height());
  stageWidth = $(window).width();
  stageHeight = $(window).height();

  for(var i = 0; i < particleCount; i++){
    var particle = particles[i];

    particle.x = particle.endX = _.random(stageWidth);
    particle.y = particle.endY = _.random(stageHeight);
  }
}

$(window).resize(resize);

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", tick);




