require("dotenv").config();
var keys = require("./keys.js");
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var request = require("request");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// var cTable = require("console.table"); 
// var spotify = new Spotify({
//   id: keys.spotify.id,
//   secret: keys.spotify.secret
// });

// Store all of the arguments in an array
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
  console.log("in the concert");

  if (!search) {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/Pink/events?app_id=codingbootcamp";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl, "no search");

    axios.get(queryUrl).then(
      function(response) {

        // console.log(response);
        // console.log("Artists requested is: " + response.data.definitions.ArtistData);
        // console.log("Name of venue: " + response.data.Year);
        // console.log("Venue Location: " + response.data.imdbRating);
        // console.log("Date of the Event: " + response.data.imdbRating);
      })
      } else {
        var artist = process.argv.slice(3).join(" ")
        console.log(artist);

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=b124f8f07a5e8ac35b25650830de04b4";
    
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    axios.get(queryUrl).then(
    function(response) {
      console.log("above JSON");
        var response = JSON.parse(body)[0];
        console.log("Name of venue: " + response.venue.name);
        console.log("Venue location: " + response.venue.city);
        console.log("Date of Event: " + moment(response.datetime).format("MM/DD/YYYY"));
    });
        // var obj = JSON.parse(response);
        // console.log(obj);
        // var obj = JSON.parse(response, function (key, value) {
        //   if (key == "offers") {
        //       // return new Date(value);
        //       console.log(key, "key");
            
        //   } 
        //   });
        // console.log("im here");
        // console.log(response.data.bands);
   
        // console.log("Artists requested is: " + response.data.definitions.ArtistData);
        // console.log("Artists requested is: " + response.data.Title);
        // console.log("Name of venue: " + response"offers");
        // console.log("Venue Location: " + response.data.imdbRating);
        // console.log("Date of the Event: " + response.data.imdbRating);
     
  }
}
function spot() {
  console.log("spotify");
  // if (!search) {
  //   spotify.search
  // }
  spotify.search(function (err, data) {
    if (err) {
        return console.log("Error occurred: " + err);
    }

    // var tableArray = [];

    for (var i = 0; i < data.tracks.items.length; i++) {
        var result = {
            artist: data.tracks.items[i].album.artists[0].name,
            album_name: data.tracks.items[i].album.name,
            song_name: data.tracks.items[i].name,
            preview_url: data.tracks.items[i].preview_url
        }
        console.log(results, "results");
        // tableArray.push(result);
    }
    // var table = cTable.getTable(tableArray);

    // console.log(table);
});
}

function movie() { 
  if (!search) {
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=de92683e";

// This line is just to help us debug against the actual URL.
console.log(queryUrl, "no search");

axios.get(queryUrl).then(
  function(response) {
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
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=de92683e";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
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
