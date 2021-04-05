const app = {};

// global declarations
app.multiEndPoint = 'multi';
app.multiUrl = `https://api.themoviedb.org/3/search/${app.multiEndPoint}?`;
app.apiKey = 'a95c3731bb8d542ff3503355315d717a';

// target our info-container
app.infoDiv = document.querySelector('.info-container');
app.posterDiv = document.querySelector('.poster-container');

//query selector for movie search bar = query
app.movieFormElement = document.querySelector('form');

// form event handler for movie searches
app.movieFormElement.addEventListener('submit', function(e) {
    //prevent form submit from refreshing page
    e.preventDefault();
    //get user input from movie search bar
    app.movieUserInput = document.querySelector('input');
    //get the input value and store in a variable
    app.movieUserQuery = app.movieUserInput.value;
    app.movieSearch(app.apiKey, app.multiUrl, app.movieUserQuery);
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
    app.infoDiv.innerHTML = "";
    // determine whether query is for a person or a movie
    let mediaType = '';
    let details = '';
    if (movieObject.results.length === 0){
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.innerHTML = 'No results found that match your search, please try a valid search';
        app.infoDiv.appendChild(errorElement);
    } else if (movieObject.results.length === 1){
        if (movieObject.results[0].media_type === 'movie'){
            mediaType = 'title';
            details = 'overview';
        } else if (movieObject.results[0].media_type === 'person') {
            mediaType = 'name';
            details = 'title';
        }
        app.displayMovieInfo(movieObject.results[0], mediaType, details);
        } else {      
            // display titles of each film as links
            app.displayMultiTitle(movieObject);
        }
}

// function to display multiple movie/actor titles, if applicable
app.displayMultiTitle = (movieTitleObj) => {
    app.infoDiv.innerHTML = "";
    //create ul
    const ulElement = document.createElement('ul');
    app.infoDiv.appendChild(ulElement);
    //grab array of movie objects
    const movieArray = movieTitleObj.results;
    movieArray.map(function(item) {
        return item;
    });
    //iterate through each object grabbing title of movie
    movieArray.forEach(item => {
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');
        const movieTitle = item.media_type;
        let endPoint = '';
        let descriptionPoint = '';
        if (movieTitle === 'person'){
            endPoint = 'name';
            descriptionPoint = 'title'
        } else if (movieTitle === 'movie') {
            endPoint = 'title';
            descriptionPoint = 'overview'
        } else {
            endPoint = 'name';
            descriptionPoint = 'overview'
        }
        linkElement.innerHTML = item[endPoint];
        linkElement.href='javascript:void(0)';
        linkElement.onclick= function() {app.displayMovieInfo(item, endPoint, descriptionPoint)};
        //populate li with title (a tag)
        liElement.appendChild(linkElement);
        ulElement.appendChild(liElement);
    });
}

// print movie title/overview to info-container div
app.displayMovieInfo = (movieDetails, mediaType, description) => {
    // create an h2 to print movie title into
    const h2Element = document.createElement('h2');
    app.infoDiv.innerHTML = "";
    // store value
    const movieTitle = movieDetails[mediaType];
    // append the movie title to the info div
    h2Element.innerHTML = movieTitle;
    app.infoDiv.appendChild(h2Element);
    let movieDesc = '';
    let posterOrProfile = '';

    const ulElement = document.createElement('ul');
    app.infoDiv.appendChild(ulElement);
    if(description === 'overview') {
        movieDesc = movieDetails[description];
        const pElement = document.createElement('p');
        //append movie desc to page
        pElement.innerHTML = movieDesc;
        app.infoDiv.appendChild(pElement);
        posterOrProfile = movieDetails.poster_path;
        app.displayPoster(movieDetails, posterOrProfile);
    } else if(description === 'title') {
        // iterate through known for objects
        const knownElement = document.createElement('p');
        const knownLiElement = document.createElement('li');
        knownElement.innerHTML = 'Known For:';
        knownLiElement.appendChild(knownElement);
        ulElement.appendChild(knownLiElement);
        movieDetails.known_for.forEach(item => {
            movieDesc = item[description];
            // create a p tag to print movie overview into
            const liElement = document.createElement('li');
            //append movie desc to page
            liElement.innerHTML = movieDesc;
            ulElement.appendChild(liElement)  
        });
        posterOrProfile = movieDetails.profile_path;
        app.displayPoster(movieDetails, posterOrProfile)
    }  
}

// print movie poster image to poster-container div
app.displayPoster = (posterObject, imgPath) => {
    //create img element to print poster to
    const imgElement = document.createElement('img');
    //get poster url from api
    const imgUrl = imgPath;
    let altDesc = '';
    if (posterObject.media_type === 'person') {
        altDesc = posterObject.name;
        imgElement.alt = `profile picture for ${altDesc}`
    } else if(posterObject.media_type === 'movie') {
        altDesc = posterObject.title
        imgElement.alt = `movie poster for ${altDesc}`
    }
    //append img url to source, full url from api documentation
    imgElement.src = `https://image.tmdb.org/t/p/w500${imgUrl}`;
    //append img element to page
    app.posterDiv.appendChild(imgElement);
}