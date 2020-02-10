var fs = require("fs");
require("dotenv").config();

var keys = require("./keys.js");

var moment = require("moment")

var commandType = process.argv[2]

var searchString = process.argv[3]

var text = ""

//console.log(searchString)

var axios = require("axios");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var queryUrl = "http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy";

function liriBot() {

    if (commandType === "spotify-this-song") {
        text = ""

        if (searchString === "") {
            searchString = "The Sign"
        }
        spotify.search({ type: 'track', query: searchString }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //console.log(JSON.stringify(data));
            //console.log(data.tracks.items[0]);
            console.log("---------Spotify this Song-------")
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview: " + data.tracks.items[0].preview_url);

            text = "---------Spotify this Song-------\n" + "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song: " + data.tracks.items[0].name + "\n" + "Album: " + data.tracks.items[0].album.name + "\n" + "Preview: " + data.tracks.items[0].preview_url + "\n"

            fs.appendFile("log.txt", text, function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    console.log(err);
                }

                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Content Added!");
                }

            });


        });
    }

    else if (commandType === "concert-this") {
        text=""
        console.log("Concerts for: " + searchString + "----------")
        axios.get("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp"
        ).then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("-----Concert This--------")
                console.log("Venue Name: " + response.data[i].venue.name)
                console.log("Venue Location: " + response.data[i].venue.country + "," + response.data[i].venue.region + "," + response.data[i].venue.city)
                console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))

                text = "-----Concert This: "+searchString+"--------\n" + "Venue Name: " + response.data[i].venue.name + "\n" + "Venue Location: "+response.data[i].venue.country + "," + response.data[i].venue.region + "," + response.data[i].venue.city + "\n" + "Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY")+ "\n"

                fs.appendFile("log.txt", text, function (err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Added!");
                    }

                });

            }
            //console.log(response)

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

    }
    else if (commandType === "movie-this") {

        axios.get(queryUrl).then(
            function (response) {
                console.log("-----Movie This--------")
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                //fet index of rotten tomatoe rating object rom Rating array
                var rottemRatingIndex = response.data.Ratings.findIndex(p => p.Source == "Rotten Tomatoes")
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[rottemRatingIndex].Value);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);


                text = "-----Movie This: \n" + "Title: " + response.data.Title + "\n" + "Release Year: " + response.data.Year  + "\n" + "IMDB Rating: " + response.data.imdbRating+ "\n"+"Rotten Tomatoes Rating: " + response.data.Ratings[rottemRatingIndex].Value+"\n"+"Language: " + response.data.Language+"\n"+"Plot: " + response.data.Plot+"\n"+"Actors: " + response.data.Actors+"\n"

                fs.appendFile("log.txt", text, function (err) {

                    // If an error was experienced we will log it.
                    if (err) {
                        console.log(err);
                    }

                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Added!");
                    }

                });


                //console.log(response.data)
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });

    }
    else {
        console.log("-------Not A Valid Request---- Please read README.md for valid requeest/command")
    }
}

if (commandType === "do-what-it-says") {

    

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        for (i = 0; i < dataArr.length; i++) {
            dataArr[i] = dataArr[i].replace(/\r?\n|\r/g, " ");
            if (i === 1) {
                searchString = dataArr[i]
            }
            else {
                commandType = dataArr[i]

            }

        }
        liriBot()
    });

}
else {
    liriBot()
}