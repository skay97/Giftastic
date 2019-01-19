// An array of the All time greats:
var athletes = ["Muhammad Ali", "Tom Brady", "Michael Jordan", "Lebon James", "Tiger Woods", "Roger Federer", " Serena Williams", "Michael Phelps"];

// the next functon creates a button for the array created above
function makeButton() {
    $("#buttons-view").empty()

    for (var i = 0; i < athletes.length; i++) {
        var x = $("<button>" + athletes[i] + "</button>");
        x.addClass("athlete");
        x.attr("data-name", athletes[i]);
        $("#buttons-view").append(x);
    }
}

// Buttons are added when the form button is pressed
$("#add-athlete").on("click", function () {
    var athlete = $("#athlete-input").val().trim();
    athletes.push(athlete);
    // now the make button function is called which creates button for all my buttons in the array and a new button for the athlete recently added
    makeButton();
    // This line enables the user to simly hit enter rather than virtually clicking the button via their cursor
    return false;
})

//function to display our gifs:
function displayGifs() {
    var athlete = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + athlete + "&limit=9&api_key=96JGipRzoU7vX3BfNb3OrEEuJKAx26Am";

    //execute ajax call 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response.data); // did not show in console

        var results = response.data

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div class=gifs>');
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            // shows the rating on hover
            showGif.attr('title', "Rating: " + results[i].rating);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);
            gifDiv.append(showGif)

            $("#gifsView").prepend(gifDiv);

        }

    })
}

// function for animating gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    console.log(this);
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});

$(document).on("click", ".athlete", displayGifs);

makeButton()