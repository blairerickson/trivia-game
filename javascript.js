
//  Trivia code section


var images = ["http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/city/", "http://lorempixel.com/600/400/people/"];

var movies = ["Ferris Bueller's Day Off","What Dreams May Come","Fear and Loathing in Las Vegas","Cabin in the Woods","Schindler's List", "Halloween 2","Naked Gun", "Deep Blue Sea", "Drag Me to Hell","Rambo","Kindergarden Cop","Total Recall","The Thing","The Fast and the Furious","The Iron Giant","Frozen","Saw 5","Saw 2","Saw 4","Saw 3","The Incredibles","Ratatouille","The Blues Brothers","National Lampoon's Christmas Vacation","Star Trek II","Close Encounters of the Third Kind","War of the Worlds","Toy Story 3", "Tango and Cash","The Expendables","2 Fast 2 Furious","Die Hard 2","Police Academy","Die Hard 3","Die Hard", "Friday the 13th part 2","Empire of the Sun","Hope Floats","Catch Me if You Can","What About Bob","Scarface","The Matrix","Rogue One","The Force Awakens","The Empire Strikes Back","Star Wars: A New Hope","Return of the Jedi","Indiana Jones and the Last Crusade","Indiana Jones and the Temple of Doom","Raiders of the Lost Ark","Before Midnight","Before Sunset","Before Sunrise","School of Rock","Boyhood","Eight Legged Freaks","Pulp Fiction","Inglourious Basterds","Robin Hood: Prince of Thieves","Twelve Monkeys","Fight Club","Gone Girl","Se7en","Evil Dead 2","Ex-Machina","District 9", "Zodiac","The Fly","Groundhog's Day", "Rebel Without a Cause","Enemy At the Gates","Saving Private Ryan","Sunset Boulevard", "Creature From the Black Lagoon","Lake Placid","Dumb and Dumber","Me Myself and Irene","Eternal Sunshine of the Spotless Mind","Jurassic Park", "The Big Lebowski", "Banshee Chapter","The Dark Knight", "Gremlins","Deadpool","Terminator","Terminator 2","King Kong","A Nightmare on Elm Street","The Avengers","Children of Men", "Oldboy","Steel Magnolias","Can't Hardly Wait","The Breakfast Club"];


var random = Math.floor((Math.random() * movies.length) + 1);
var dice = Math.floor((Math.random() * movies.length) + 1);
var points = 0;
var point_counter = 10;

var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=1&api_key=dc6zaTOxFJmzC';


var Qwrong = Math.floor((Math.random() * movies.length) + 1);
var Arand = Math.floor((Math.random() * 4) + 1);


function AnswerSort()
{


 Arand = Math.floor((Math.random() * 4) + 1);
  console.log ("sorted, Arand is " +Arand)
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


function hidebutton() {
    var x = document.getElementById('begin');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

var showImage;

// Count will keep track of the index of the currently displaying picture.
var count = 0;

$("#begin").click(startSlideshow);
$("#begin").click(AnswerSort);

$("#Ans1").click(CheckAnswer);

function CheckAnswer()
{
  if (Arand == 1 )
  {
    console.log(Arand + "CORRECT!");
  }
  else 
  {
  console.log(Arand + "WRONG...");
  }
}



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

       $("#image-holder").html('<img src="' + response.data[0].images.fixed_height.url + ' " width="600px"> ');

    });

}

function nextImage() {
  //  TODO: Increment the count by 1.
  count++;
  random = Math.floor((Math.random() * movies.length) + 1);
  Arand = Math.floor((Math.random() * 4) + 1);
  AnswerSort();

 $("#image-holder").html("<img src='images/loading.gif' width='150px'/>");

  
  setTimeout(displayImage, 1000);

}

function startSlideshow() {

  // TODO: Use showImage to hold the setInterval to run nextImage.
  showImage = setInterval(nextImage, 10000);
hidebutton();
}

function stopSlideshow() {

  // TODO: Put our clearInterval here:
  clearInterval(showImage);

}

// This will run the display image function as soon as the page loads.
displayImage();



