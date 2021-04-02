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
        // console.log(jsonResponse);
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
        errorElement.innerHTML = 'No movies found that match your search, please try a valid movie title';
        app.movieInfo.appendChild(errorElement);
    } else if (movieObject.results.length === 1){
        if (movieObject.results[0].media_type === 'movie'){
            mediaType = 'title';
            details = 'overview';
            console.log(mediaType);
            console.log(details);
        } else if (movieObject.results[0].media_type === 'person') {
            mediaType = 'name';
            details = 'known_for[0]';
            console.log(mediaType);
            console.log(details);
        }
        app.displayMovieInfo(movieObject.results[0], mediaType, details);
        app.displayPoster(movieObject.results[0]);
        } else {
            
            // display titles of each film as links
            app.displayMultiTitle(movieObject);
        }
}

// function to display multiple movie/actor titles, if applicable
app.displayMultiTitle = (movieTitleObj, mediaType, details) => {
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
        if (movieTitle === 'person'){
            endPoint = 'name';
        } else if (movieTitle === 'movie') {
            endPoint = 'title';
        }
        linkElement.innerHTML = item[endPoint];
        linkElement.href='javascript:void(0)';
        linkElement.onclick= function() {app.displayMovieInfo(item, endPoint)};
        //populate li with title (a tag)
        liElement.appendChild(linkElement);
        ulElement.appendChild(liElement);
    });
}
// app.displayPoster(item)

// print movie title/overview to info-container div
app.displayMovieInfo = (movieDetails, mediaType) => {
    // create an h2 to print movie title into
    const h2Element = document.createElement('h2');
    app.infoDiv.innerHTML = "";
    // create a p tag to print movie overview into
    const pElement = document.createElement('p');
    // store value
    const movieTitle = movieDetails[mediaType];
    // append the movie title to the info div
    h2Element.innerHTML = movieTitle;
    app.infoDiv.appendChild(h2Element);
    let movieDesc = '';
    // iterate through known for objects
    movieDetails.known_for.forEach(item => {
        movieDesc = item.title;
        // create a p tag to print movie overview into
        const pElement = document.createElement('p');
        //append movie desc to page
        pElement.innerHTML = movieDesc;
        app.infoDiv.appendChild(pElement);
    })
    
    
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

// print actor name/known for credits to info-container div
app.displayActorInfo = (actorDetails) => {  
    // create an h2 to print actor name into
    const actorH2Element = document.createElement('h2');
    app.infoDiv.innerHTML = "";
    // create a p tag to print movie overview into
    const pElement = document.createElement('p');
    // store value
    const actorName = actorDetails.results[0].name;
    // append the actor name to the info div
    actorH2Element.innerHTML = actorName;
    app.infoDiv.appendChild(actorH2Element);
    //append movie desc to page
    const actorKnownFor = actorDetails.results[0].known_for[0].title;
    pElement.innerHTML = actorKnownFor;
    app.infoDiv.appendChild(pElement);
}

// print actor image to poster-container div
app.displayActorImg = (actorImgObject) => {
    //create img element to print poster to
    const imgElement = document.createElement('img');
    //get poster url from api
    const imgUrl = actorImgObject.results[0].profile_path;
    //append img url to source, pull url from api documentation
    imgElement.src = `https://image.tmdb.org/t/p/w500/${imgUrl}`;
    imgElement.alt = `image of ${actorImgObject.results[0].name}`
    //append img element to page
    app.posterDiv.appendChild(imgElement);
}