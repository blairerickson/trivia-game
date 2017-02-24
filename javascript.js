
//  Trivia code section


var images = ["http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/people/"];

var movies = ["Ferris Bueller's Day Off","What Dreams May Come","Fear and Loathing in Las Vegas","Cabin in the Woods","Schindler's List", "Halloween 2","Naked Gun", "Deep Blue Sea", "Drag Me to Hell","Rambo","Kindergarden Cop","Total Recall","The Thing", "Tango and Cash","The Expendables","2 Fast 2 Furious","Die Hard 2","Police Academy","Die Hard 3","Die Hard","Speed", "Friday the 13th part 2","Empire of the Sun","Gravity", "Rebel Without a Cause","Enemy At the Gates","Saving Private Ryan","Sunset Boulevard", "Creature From the Black Lagoon","Lake Placid","Dumb and Dumber","Me Myself and Irene","Eternal Sunshine of the Spotless Mind","Jurassic Park", "The Big Lebowski", "Banshee Chapter","E.T.", "Gremlins","Deadpool","Terminator","Terminator 2","King Kong","A Nightmare on Elm Street","The Avengers","Children of Men", "Oldboy","Steel Magnolias","Can't Hardly Wait","The Breakfast Club"];

var random = Math.floor((Math.random() * movies.length) + 1);
var dice = Math.floor((Math.random() * movies.length) + 1);


var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=1&api_key=dc6zaTOxFJmzC';


var Qwrong = Math.floor((Math.random() * movies.length) + 1);
var Arand = Math.floor((Math.random() * 3) + 1);


function AnswerSort()
{
 for (var i = 1; i < 5; i++)
 {
 if (Arand == i)
      {
        $('#Ans' + i).html(movies[random]);
      }
 else
    {
    dice = Math.floor((Math.random() * movies.length) + 1);
        $('#Ans' + i).html(movies[dice]);
    }

 }
}

var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

$("#begin").click(startSlideshow);
$("#begin").click(AnswerSort);



$("#questionbox").html("TEST QUESTION FOR QUESTION BOX.");



// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {

var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=1&api_key=dc6zaTOxFJmzC';


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
  random = Math.floor((Math.random() * movies.length) + 1);
  AnswerSort();

 $("#image-holder").html("<img src='images/loading.gif' width='200px'/>");

  
  setTimeout(displayImage, 1000);

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



