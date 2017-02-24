
//  Trivia code section


var images = ["http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/people/"];

var movies = ["Schindler's List", "Halloween 2","Naked Gun", "Deep Blue Sea", "Drag Me to Hell","Rambo","Kidergarten Cop","Total Recall","The Thing", "Tango and Cash","The Expendables","2 Fast 2 Furious","Die Hard 2","Police Academy","Die Hard 3","Die Hard","Speed", "Friday the 13th part 2","Empire of the Sun","Gravity", "Rebel Without a Cause","Enemy At the Gates","Saving Private Ryan","Sunset Boulevard", "Creature From the Black Lagoon","Lake Placid","Dumb and Dumber","Me Myself and Irene","Eternal Sunshine of the Spotless Mind","Jurassic Park", "The Big Lebowski", "Banshee Chapter","E.T.", "Gremlins","Deadpool","Terminator","Terminator 2","King Kong","A Nightmare on Elm Street","The Avengers","Children of Men", "Oldboy","Steel Magnolias","Can't Hardly Wait","The Breakfast Club"];

var random = Math.floor((Math.random() * movies.length) + 1);

var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=1&api_key=dc6zaTOxFJmzC';


var Qrand = Math.floor((Math.random() * 3) + 1);
var Arand = Math.floor((Math.random() * 3) + 1);




var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

$("#begin").click(startSlideshow);
$("#stop").click(stopSlideshow);


$("#questionbox").html("TEST QUESTION FOR QUESTION BOX.");



// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {
    

  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
     // console.log(response.images.url);
      console.log(response.data[0].images.fixed_height.url);
      console.log(queryURL);

       $("#image-holder").html('<img src="' + response.data[0].images.fixed_height.url + ' "> ');

    });

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



