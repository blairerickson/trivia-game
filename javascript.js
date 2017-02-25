


//  Trivia code variables section

var movies = ["Ferris Bueller's Day Off","What Dreams May Come","Fear and Loathing in Las Vegas","Cabin in the Woods","Schindler's List", "Halloween 2","Naked Gun", "Deep Blue Sea", "Drag Me to Hell","Rambo 2","Kindergarden Cop","Total Recall","The Thing","The Fast and the Furious","The Iron Giant","Frozen","Saw 5","Saw 2","Saw 4","Saw 3","The Incredibles","Ratatouille","The Blues Brothers","National Lampoon's Christmas Vacation","Star Trek II","Close Encounters of the Third Kind","War of the Worlds","Toy Story 3", "Tango and Cash","The Expendables","2 Fast 2 Furious","Die Hard 2","Police Academy","Die Hard 3","Die Hard", "Friday the 13th part 2","Lilo and Stitch","Hope Floats","Catch Me if You Can","What About Bob","Scarface","The Matrix","Rogue One","The Force Awakens","The Empire Strikes Back","Star Wars: A New Hope","Return of the Jedi","Indiana Jones and the Last Crusade","Indiana Jones and the Temple of Doom","Raiders of the Lost Ark","Before Midnight","Before Sunset","Before Sunrise","Adventures in Babysitting","Boyhood","Eight Legged Freaks","Pulp Fiction","Inglourious Basterds","Robin Hood: Prince of Thieves","Twelve Monkeys","Fight Club","Gone Girl","Se7en","Evil Dead 2","Ex-Machina","District 9","The Fly","Groundhog's Day", "Rebel Without a Cause","Enemy At the Gates","Saving Private Ryan","Sunset Boulevard", "Creature From the Black Lagoon","Lake Placid","Dumb and Dumber","Me Myself and Irene","Eternal Sunshine of the Spotless Mind","Jurassic Park", "The Big Lebowski", "Banshee Chapter","The Dark Knight", "Gremlins","Deadpool","Terminator","Terminator 2","King Kong","A Nightmare on Elm Street","The Avengers: Age of Ultron","Children of Men", "Oldboy","Steel Magnolias","Can't Hardly Wait","The Breakfast Club"];
var random = Math.floor((Math.random() * movies.length) + 1);
var dice = Math.floor((Math.random() * movies.length) + 1);
var points = 0;
var point_counter = 0;
var GameGo = 0;
var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=5&api_key=dc6zaTOxFJmzC';
var Qwrong = Math.floor((Math.random() * movies.length) + 1);
var Arand = Math.floor((Math.random() * 4) + 1);
var Hint1 = "blank";
var Hint2 = "blank";
var Hint3 = "blank";
var Hint4 = "blank";
var triviagame = document.getElementById('triviagame');
var showImage;
var clicked = 0;

// Count will keep track of the index of the currently displaying picture.
var count = 0;


triviagame.style.visibility = 'hidden';



//starts the countdown timer
// a is the time limit in seconds for each round

var a = 15;
var i = setInterval( timer, 1000 );

function timer() {
  if (GameGo == 1)
  {
    console.log( a );
    if ( a < 1) {
        console.log( 'Reaching Stop' ); 
        CheckAnswer(0);
//stops the timer and checks for no answer
        clearInterval( i );
        GameGo = 0;
        return;         
    } 
    a -= 1;
        clock.decrement();
   }

//distributes hints based on the countdown timer

          if (a == 12)
          {
           $("#HintBox1").html('<img src="' + Hint1 + ' " width="100%"> ');
          }

          if (a == 9)
         {
           $("#HintBox2").html('<img src="' + Hint2 + ' " width="100%"> ');
          }
          if (a == 5)
          {
             $("#HintBox3").html('<img src="' + Hint3 + ' " width="100%"> '); 
            }
          if (a == 3)
          {         
           $("#HintBox4").html('<img src="' + Hint4 + ' " width="100%"> ');
         }
  }



//randomly distributes answers and keeps track of which button they're tied to.

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


// checks if the button pressed was the correct answer or not.
function CheckAnswer(clicked)
{
     $("#side_box").hide(100);
     $("#CountTicker").hide(100);
     $("#button_bar").hide(100);
     $("#text_area").show(100);

    console.log(clicked);
  if (Arand == clicked )
  {
    console.log(Arand + "CORRECT!");
    point_counter = point_counter + a;
    console.log('current points:'+ point_counter);

               $("#text_area").html('<h2>CORRECT! You earned ' + a + ' points. </h2>');
               $("#text_area").append('<br> total score: ' + point_counter);
              

  }
  else 
  {
  console.log(Arand + "WRONG...");
               point_counter = point_counter - a;
               $("#text_area").html('<h2>WRONG... You lost ' + a + ' points. </h2>');
               $("#text_area").append('<br> total score: ' + point_counter);
          

  }

  intermission();
}


function intermission()
{
          clearInterval( i );
  console.log("intermission");
  // setInterval(function(){ nextImage();
  //  }, 3000);
}

// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.
function displayImage() {

var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movies[random]+ '&limit=5&api_key=dc6zaTOxFJmzC';


  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
     // console.log(response.images.url);
      console.log(response.data[0].images.fixed_height.url);
      console.log(queryURL);

     $("#image-holder").html('<img src="' + response.data[0].images.fixed_height.url + ' " width="600px"> ');

       Hint1 = response.data[1].images.fixed_height.url;
       Hint2 = response.data[2].images.fixed_height.url;
       Hint3 = response.data[3].images.fixed_height.url;
       Hint4 = response.data[4].images.fixed_height.url;
       console.log("hint1 is " + Hint1);
    });

}

function nextImage() 
    {

     $("#side_box").show(100);
     $("#CountTicker").show(100);
     $("#button_bar").show(100);
     $("#text_area").hide(100);

                      // $("#main_area").append('<center><h1>What movie gives this gif result?</h1></center>')
          count++;
          random = Math.floor((Math.random() * movies.length) + 1);
          Arand = Math.floor((Math.random() * 4) + 1);
           $("#HintBox1").html("Hint #1");
           $("#HintBox2").html("Hint #2");
           $("#HintBox3").html("Hint #3");
           $("#HintBox4").html("Hint #4");
           a = 15;
           displayImage()

          AnswerSort();


         // $("#image-holder").html("<img src='images/loading.gif' width='150px'/>");

        clock = $('.clock').FlipClock(a, 
               {
                    clockFace: 'Counter',
                    countdown: true,
         
                });

    }



function startGameshow() 
      {
      // showImage = setInterval(nextImage, a * 1000);
      hidebutton();
      triviagame.style.visibility = 'visible';
      nextImage();
      }

function stopSlideshow() 
      {
        clearInterval(showImage);
      }

displayImage();


//clock countdown display
var clock;
    
    $(document).ready(function() {
      
      clock = $('.clock').FlipClock(a, 
       {
            clockFace: 'Counter',
            countdown: true,
 
        });



    });


$("#begin").click(function(e) 
      {
            clock.start();
            GameGo = 1;
        });


$("#begin").click(startGameshow);
$("#begin").click(AnswerSort);

$("#Ans1").click(function(){
  console.log("button 1 pressed")
  CheckAnswer(1);
});

$("#Ans2").click(function(){
  console.log("button 2 pressed")
  CheckAnswer(2);
});

$("#Ans3").click(function(){
  console.log("button 3 pressed")
  CheckAnswer(3);
});
$("#Ans4").click(function(){
  console.log("button 4 pressed")
  CheckAnswer(4);
});

// $("#Ans3").click(nextImage);
// $("#Ans3").click(timer);
