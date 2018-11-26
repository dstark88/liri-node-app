require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.

var spotify = new Spotify(keys.spotify);


// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says