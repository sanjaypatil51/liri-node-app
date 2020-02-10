# liri-node-app

Author: Sanjay Patil
Date: 02/09/2020


Technology Used:  Javascript, node.js
APIs: spotify, omdbapi, bandsintown and axios


This BOT will help you to spoitfy song, get concert venue detail or movie deatils

Installation:

Download and Install node url: https://nodejs.org/en/download/

Clone this APP from github, clone url: git@github.com:sanjaypatil51/liri-node-app.git

After downloading app, cd to directory and run below command from command prompt or from terminal

npm install

For spofity you need to get your own key and store it inot  ".env" file in below format:

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


Commands to run app:

Option 1: Find Artisit concert:

    node liri.js concert-this '<artist/band name here>'

    Output:
     * Name of the venue

     * Venue location

     * Date of the Event

Option 2: Spotify Song:

    node liri.js spotify-this-song '<song name here>'

    Output:
     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

Option 3: Find Movie Detail:

    node liri.js movie-this '<movie name here>

    Output:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

Option 4: Do What it says: This will read comand from "random.txt" file and run one of the commadns from Option1 to Option3

    node liri.js do-what-it-says


