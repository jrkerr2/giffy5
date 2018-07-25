$(document).ready(function() {
	// executes when document is ready

    //giphy API key for John Kerr
    var apiKey = "Z8lBjCboNSl3SWH8t4ewhD5ZTKp82tJQ"; 

    // initial array of topics with which to search Giphy
    var topics = ["mouse", "woodchuck", "baboon", "kangaroo", "hyena"];

    // use back ticks for template strings (variables)
    var giphyURL = `https://api.giphy.com/v1/gifs/search?q=`;

    var searchString = "";

    //use joins??? in query strings
    addButtons();


    function addButtons() {

        // clear buttons div and re-populate with current array so as not to duplicate 
        $("#buttonsContainer").empty();

        // iterating through the topics array
        for (var i = 0; i < topics.length; i++) {

        // Generate buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var b = $("<button>");

        // Adding a class of topics-btn to buttons and formatting using bootstrap helper classes
        b.addClass("topics-btn btn-info");

        // Adding a data-attribute
        b.attr("data-name", topics[i]);

        // Providing the initial button text
        b.text(topics[i]);

        // Adding buttons to the buttonsContainer div
        $("#buttonsContainer").append(b);
        // console.log(topics);
        // console.log(b);
        }
    }
    // on button click add to topic array, add button
    $("#add-gif").on("click", function(event) {
        event.preventDefault();

        // grab user input from text box
        topic = $("#text-gif").val().trim();

        // Add any NEW input to topics array
        if (!topics.includes(topic) && topic != "") {
          topics.push(topic);
          addButtons();
          // clear textbox input
          $("#text-gif").val("");

        }
        else {
          alert("That animal button already exists. Try again.")
          // clear textbox input
          $("#text-gif").val("");
        }        
      
    });

    // need event listener to capture button .class event, pass search string to API call
    $(document).on("click", ".topics-btn", function() { // $(".topics-btn").on("click", function() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=Z8lBjCboNSl3SWH8t4ewhD5ZTKp82tJQ&rating=pg&limit=9";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) { // vs. done???
            var results = response.data;
            console.log(results);
            
            // clear .gifs view
            $("#gif-view").empty();
            
            // iterate through results and add images to div with attr's for later selectors use
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var animalImage = $("<img>");
              animalImage.attr("src", results[i].images.fixed_height_small_still.url);
                
              animalImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
              animalImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
              animalImage.attr("data-state", "still"); // set the image state
              animalImage.addClass("image");
  
              gifDiv.prepend(p);
              gifDiv.prepend(animalImage);
  
              $("#gif-view").prepend(gifDiv);
            }
          });

          
        });
      });

      // change gif animation state
      $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }

        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
});