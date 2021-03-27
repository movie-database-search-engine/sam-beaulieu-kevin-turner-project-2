//&query=

// app.movieSearch(app.apiKey, app.configUrl, app.userQuery);

const app = {};

//for stretch goal grab value of button to use as endpoint. currently movie is fine
app.endPoint = 'movie';
app.configUrl = `https://api.themoviedb.org/3/search/${app.endPoint}?`;
app.apiKey = 'a95c3731bb8d542ff3503355315d717a';
// target our info-container
app.movieInfo = document.querySelector('.info-container');

//query selector for search bar = query
app.formElement = document.querySelector('form');

//form event handler
app.formElement.addEventListener('submit', function(e) {
    //prevent form submit from refreshing page
    e.preventDefault();
    //get user input from search bar
    app.userInput = document.querySelector('input');
    //get the input value and store in a variable
    app.userQuery = app.userInput.value;

    app.movieSearch(app.apiKey, app.configUrl, app.userQuery);
})

//this function calls the api and searches for a movie based on the user input from the search bar
app.movieSearch = (apiKey, searchUrl, userQuery) => {
    const url = new URL(searchUrl);
    url.search = new URLSearchParams({
        api_key: apiKey,
        query: userQuery
    });

    fetch(url).then( (res) => {
        return res.json();
    }).then( (jsonResponse) => {
        app.displayMovieInfo(jsonResponse);
    });
}

app.displayMovieInfo = (movieDetails) => {
    // create an h2 to print movie title into
    const h2Element = document.createElement('h2');
    // create a p tag to print movie overview into
    const movieOverview = document.createElement('p');
    // store value
    const movieTitle = movieDetails.results[0].title;
    // append the movie title to the info div
    h2Element.innerHTML = movieTitle;
    app.movieInfo.appendChild(h2Element);
}

// print movie title/overview to info-container div

// target our poster-container
// print movie poster image to poster-container div


