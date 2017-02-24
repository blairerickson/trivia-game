
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



