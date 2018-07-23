$(document).ready(function() {
	// executes when document is ready

    //giphy API key for John Kerr
    var apiKey = "Z8lBjCboNSl3SWH8t4ewhD5ZTKp82tJQ"; 

    // initial array of topics with which to search Giphy
    var topics = ["mouse", "woodchuck", "baboon", "kangaroo", "hyena"];

    // use back ticks for template strings (variables)
    var apiURL = `https://cnn.com/articles/?${searchString}`;

    var searchString = "";

    //use joins??? in query strings
    addButtons();


    function addButtons() {

        // Deleting any previous buttons added   
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
        //console.log(topics);
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

});