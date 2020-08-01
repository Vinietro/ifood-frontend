# Ifood Spotify API

React project to show playlists from Spotify

## Solution

First I created the project with the command create-react-app, after that I created the component's routes, one for the home page and one for the playlist page.

Then, I installed SASS for better agility and organization in development.

Right after, I started to develop the home page with a login button that redirects to the Spotify login API, so I can get the user's token through the hash in the URL that Spotify returns to me.

After that I implemented the layout of the playlist page, connecting the endpoint to search for playlists in the Spotify API.

Then, I implemented the dynamic filters according to the mock endpoint and their functionalities when searching for the list, as well as its validation.

And finally, I created a Handler to hear the changes that occurred in the filter and separated the functionalities into components.

It also has a 30 second interval that the application updates the playlist to get the latest songs

# How to run the application

First install node package manager.

After that, type "npm install" on the application folder, then just type "npm start" and the server will be avaliable on http://localhost:3000/
