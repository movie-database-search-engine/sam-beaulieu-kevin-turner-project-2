//&query=

// app.movieSearch(app.apiKey, app.configUrl, app.userQuery);

const app = {};

//for stretch goal grab value of button to use as endpoint. currently movie is fine
app.endPoint = 'movie';
app.configUrl = `https://api.themoviedb.org/3/search/${app.endPoint}?`;
app.apiKey = 'a95c3731bb8d542ff3503355315d717a';
// target our info-container
app.movieInfo = document.querySelector('.info-container');
app.posterDiv = document.querySelector('.poster-container');

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
        app.errorHandler(jsonResponse);
        app.displayMovieInfo(jsonResponse);
        app.displayPoster(jsonResponse);
    });
}

//if the user query has multiple results, display all results on the page as links
//user clicks the correct choice and page displays info/poster
app.errorHandler = (movieObject) => {
    if (movieObject.results.length === 0){
        // display error message
    } else if (movieObject.results.length === 1){
            // call displayMovieInfo/displayPoster
        } else {
            // display titles of each film as links
        }
}

// function to display multiple movie titles, if applicable
app.

// print movie title/overview to info-container div
app.displayMovieInfo = (movieDetails) => {  
    // create an h2 to print movie title into
    const h2Element = document.createElement('h2');
    app.movieInfo.innerHTML = "";
    // create a p tag to print movie overview into
    const pElement = document.createElement('p');
    // store value
    const movieTitle = movieDetails.results[0].title;
    // append the movie title to the info div
    h2Element.innerHTML = movieTitle;
    app.movieInfo.appendChild(h2Element);
    //append movie desc to page
    const movieDesc = movieDetails.results[0].overview;
    pElement.innerHTML = movieDesc;
    app.movieInfo.appendChild(pElement);
}

// print movie poster image to poster-container div
app.displayPoster = (posterUrl) => {
    //create img element to print poster to
    const imgElement = document.createElement('img');
    //clear poster
    app.posterDiv.innerHTML = "";
    //get poster url from api
    const imgUrl = posterUrl.results[0].poster_path;
    //append img url to source, full url from api documentation
    imgElement.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;
    //append img element to page
    app.posterDiv.appendChild(imgElement);
}




//if there is no results for the user query, display message to try again
    //if object undefined, display message, else do the right thing


    //movie poster for ${movieDetails.results[item].title}


