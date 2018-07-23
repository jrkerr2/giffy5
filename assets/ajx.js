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

        // Adding a class of topics-btn to buttons
        b.addClass("topics-btn");
        // Adding a data-attribute
        b.attr("data-name", topics[i]);
        // Providing the initial button text
        b.text(topics[i]);
        // Adding buttons to the buttonsContainer div
        $("#buttonsContainer").append(b);
        console.log(topics);
        //console.log(b);
        }
    }
    // on button click add to topic array, add button
    $("#add-gif").on("click", function(event) {
        event.preventDefault();

        // grab user input from text box
        topic = $("#text-gif").val().trim();

        // Add any new input to topics array
        topics.push(topic);
        //console.log(topic);

        // Call addButtons to refresh our buttons array of topics
        addButtons();
    });

    // need event listener to capture button .class event, pass search string to API call
    $(".topics-btn").on("click", function() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=Z8lBjCboNSl3SWH8t4ewhD5ZTKp82tJQ&limit=5";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var animalImage = $("<img>");
              animalImage.attr("src", results[i].images.fixed_height.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(animalImage);
  
              $("#gif-view").prepend(gifDiv);
            }
          });
      });
});