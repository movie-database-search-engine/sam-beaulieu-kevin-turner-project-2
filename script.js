//&query=

const app = {};

//for stretch goal grab value of button to use as endpoint. currently movie is fine
app.endPoint = 'movie';
app.configUrl = `https://api.themoviedb.org/3/search/${app.endPoint}?`;
app.apiKey = 'a95c3731bb8d542ff3503355315d717a';

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
        console.log(jsonResponse.results[0]);
        
    });
}


