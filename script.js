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
    });
}

//if the user query has multiple results, display all results on the page as links
//user clicks the correct choice and page displays info/poster
app.errorHandler = (movieObject) => {
    app.posterDiv.innerHTML = "";
    app.movieInfo.innerHTML = "";
    if (movieObject.results.length === 0){
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.innerHTML = 'No movies found that match your search, please try a valid movie title';
        app.movieInfo.appendChild(errorElement);
    } else if (movieObject.results.length === 1){
        app.displayMovieInfo(movieObject.results[0]);
        app.displayPoster(movieObject.results[0]);
        } else {
            // display titles of each film as links
            app.displayMultiTitle(movieObject);
        }
}

// function to display multiple movie titles, if applicable
app.displayMultiTitle = (movieTitleObj) => {
    app.movieInfo.innerHTML = "";
    //create ul
    const ulElement = document.createElement('ul');
    app.movieInfo.appendChild(ulElement);
    //grab array of movie objects
    const movieArray = movieTitleObj.results;
    movieArray.map(function(item) {
        return item;
    });
    //iterate through each object grabbing title of movie
    movieArray.forEach(item => {
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');
        const movieTitle = item.title;
        linkElement.innerHTML = movieTitle;
        linkElement.href='javascript:void(0)';
        linkElement.onclick= function() {app.displayMovieInfo(item), app.displayPoster(item)};
        //populate li with title (a tag)
        liElement.appendChild(linkElement);
        ulElement.appendChild(liElement);
    });
}

// print movie title/overview to info-container div
app.displayMovieInfo = (movieDetails) => {  
    // create an h2 to print movie title into
    const h2Element = document.createElement('h2');
    app.movieInfo.innerHTML = "";
    // create a p tag to print movie overview into
    const pElement = document.createElement('p');
    // store value
    const movieTitle = movieDetails.title;
    // append the movie title to the info div
    h2Element.innerHTML = movieTitle;
    app.movieInfo.appendChild(h2Element);
    //append movie desc to page
    const movieDesc = movieDetails.overview;
    pElement.innerHTML = movieDesc;
    app.movieInfo.appendChild(pElement);
}

// print movie poster image to poster-container div
app.displayPoster = (posterObject) => {
    //create img element to print poster to
    const imgElement = document.createElement('img');
    //get poster url from api
    const imgUrl = posterObject.poster_path;
    //append img url to source, full url from api documentation
    imgElement.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;
    imgElement.alt = `movie poster for ${posterObject.title}`
    //append img element to page
    app.posterDiv.appendChild(imgElement);
}