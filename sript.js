//&query=

const app = {};

app.configUrl = 'https://api.themoviedb.org/3/search/movie?api_key='
app.apiKey = 'a95c3731bb8d542ff3503355315d717a';

app.testApi = () => {
    const url = new URL(app.configUrl);
    url.search = new URLSearchParams({
        client_id: app.apiKey,
        query: 'Jack Reacher'
    });

    fetch(url).then( (res) => {
        return res.json();
    }).then( (jsonResponse) => {
        console.log(jsonResponse);
    })

}
