require("dotenv").config();
var keys = require("./keys.js");
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var request = require("request");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
 
// var spotify = new Spotify({
//   id: keys.spotify.id,
//   secret: keys.spotify.secret
// });

var nodeArgs = process.argv;
var command = process.argv[2];
var search = String(process.argv.slice(3).join(" "));

switch (command) {
  case "concert-this":
  concert();
  break;

  case "spotify-this-song":
  spot();
  break;

  case "movie-this":
  movie();
  break;

  case "do-what-it-says":
  what();
  break;

  // default: console.log("Please enter something!");
}

function concert() {

  if (!search) {
    var queryURL = "https://rest.bandsintown.com/artists/Pink/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
    axios
    .get(queryURL)
    .then(function(results) {
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error);
        }
        var result = JSON.parse(body)[0];
        console.log("Name of venue: " + result.venue.name);
        console.log("Venue location: " + result.venue.city);
        console.log("Date of the Event: " + moment(result.datetime).format("MM/DD/YYYY"));
    });
    })
  } else {
    var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
    axios
    .get(queryURL)
    .then(function(results) {
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error);
        }
        var result = JSON.parse(body)[0];
        console.log("Name of venue: " + result.venue.name);
        console.log("Venue location: " + result.venue.city);
        console.log("Date of the Event: " + moment(result.datetime).format("MM/DD/YYYY"));
    });
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data, "1st message");
      } else if (error.request) {
        console.log(error.request, "2nd message");
      } else {
        console.log("Error", error.message, "3rd message");
      }
      console.log(error.config, "4th message");
    });
  }
}

function spot() {
  console.log("spotify");
  var fs = require("fs");
  var spotId = [];
  var spotSec = "";
  fs.readFile(".env", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);
    var dataArr = data.split("=");
    // console.log(dataArr[1].split("\r\n"));
    spotId = dataArr[1].split("\r\n");
    console.log(spotId[0]);
    spotSec = dataArr[2];
    console.log(spotSec);
  });
  // token request
  axios 
  .get("https://accounts.spotify.com/authorize?client_id=" + spotId[0] + "&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09")
  .then(function(response) {
    console.log("token", response);
  })
  if (!search) {
    axios
    .get("https://api.spotify.com/v1/tracks/97dc1b7492c04fcd82e1c5366af46c78s")
    .then(function(response) {
      console.log("no search spotify");
    })
  } else {
    axios
    .get("https://api.spotify.com/v1/tracks/97dc1b7492c04fcd82e1c5366af46c78s")
    .then(function(response) {
      console.log(response.data);    
      console.log("im in the for loop");
      console.log("artist: ");
      console.log("Album Name: ");
      console.log("Song Name: ");
      console.log("Preview Url: ");
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data, "1st message");
      } else if (error.request) {
        console.log(error.request, "2nd message");
      } else {
        console.log("Error", error.message, "3rd message");
      }
      console.log(error.config, "4th message");
    });
  }
}

function movie() { 
  if (!search) {
    axios
    .get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=de92683e")
    .then(function(response) {
      // console.log(response.data);
      console.log("The movie requested is: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("The movie's rating is: " + response.data.imdbRating);
      console.log("The Rotten Tomato Rating is: " + response.data.Ratings[1].Value);
      console.log("The Country is: " + response.data.Country);
      console.log("The Language is: " + response.data.Language);
      console.log("The movie plot is: " + response.data.Plot);
      console.log("The Actors are: " + response.data.Actors);
      })
  } else {
    axios
    .get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=de92683e")
    .then(function(response) {
      // console.log(response.data);
      console.log("The movie requested is: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("The movie's rating is: " + response.data.imdbRating);
      console.log("The Rotten Tomato Rating is: " + response.data.Ratings[1].Value);
      console.log("The Country is: " + response.data.Country);
      console.log("The Language is: " + response.data.Language);
      console.log("The movie plot is: " + response.data.Plot);
      console.log("The Actors are: " + response.data.Actors);
    })
  }
}

function what() {
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data);
  var dataArr = data.split(",");
});
}