require("dotenv").config();
var fs = require("fs");
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

  default: console.log("Please enter something!");
}


function concert() {

  if (!search) {
    var queryURL = "https://rest.bandsintown.com/artists/Pink/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
    axios
    .get(queryURL)
    .then(function(response) {
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error);
        }
        var response = JSON.parse(body)[0];
        console.log("Name of venue: " + response.venue.name);
        console.log("Venue location: " + response.venue.city);
        console.log("Date of the Event: " + moment(response.datetime).format("MM/DD/YYYY"));
    });
    })
  } else {
    var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
    axios
    .get(queryURL)
    .then(function(response) {
      request(queryURL, function (error, response, body) {
        var response = JSON.parse(body)[0];
        
        if (response === undefined) {
          console.log("Sorry no concerts for this band");
        } else {
        
        console.log("Name of venue: " + response.venue.name);
        console.log("Venue location: " + response.venue.city);
        console.log("Date of the Event: " + moment(response.datetime).format("MM/DD/YYYY"));
        }
    });
    });
  }
}

function spot() {
  console.log("spotify");

    if (!search) {
      search = "I Saw the Sign by Ace of Base";
      spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
      var i = 0;
      // console.log("spotify data", data.tracks);
      console.log("artist: " + data.tracks.items[i].album.artists[0].name);
      console.log("Album Name: " + data.tracks.items[i].album.name);
      console.log("Song Name: " + data.tracks.items[i].name);
      console.log("Preview Url: "+ data.tracks.items[i].preview_url);
    })
    } else {
    spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
      var i = 0;
      // console.log("spotify data", data.tracks);
      console.log("artist: " + data.tracks.items[i].album.artists[0].name);
      console.log("Album Name: " + data.tracks.items[i].album.name);
      console.log("Song Name: " + data.tracks.items[i].name);
      console.log("Preview Url: "+ data.tracks.items[i].preview_url);
    })
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
  var command = [];
  var search = "";
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data);
  var dataArr = data.split(",");
      // console.log(dataArr[0].split("\r\n"));
      command = dataArr[0].split("\r\n");
      // console.log(command[0]);
      search = dataArr[1];
      // console.log(search);
      // console.log(command[0], search);

      switch(command[0]) {
        case "concert-this":
        var queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
        axios
        .get(queryURL)
        .then(function(response) {
          request(queryURL, function (error, response, body) {
            if (error) {
              console.log(error);
            }
            var response = JSON.parse(body)[0];
            console.log("Name of venue: " + response.venue.name);
            console.log("Venue location: " + response.venue.city);
            console.log("Date of the Event: " + moment(response.datetime).format("MM/DD/YYYY"));
        });
        })
        break;
      
        case "spotify-this-song":
          spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
            var i = 0;
            // console.log("spotify data", data.tracks);
            console.log("artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Preview Url: "+ data.tracks.items[i].preview_url);
          })
        break;
      
        case "movie-this":
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
        break;
      }
});
}
