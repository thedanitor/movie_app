// API KEY Goes Here
const API_KEY = "";
// url
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
// url prefix for image path
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// url for search
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query="`;
// form element
const form = document.getElementById("form");
// search element
const search = document.getElementById("search");
// main element
const main = document.getElementById("main");

// Get initial movies on page load
getMovies(API_URL);

//async function
async function getMovies(url) {
  // res is promise returned from fetch
  const res = await fetch(url);
  // data is promise returned formatted as json
  const data = await res.json();

  showMovies(data.results);
}

// display movies on the page fetched by getMovies
function showMovies(movies) {
  // clear main div
  main.innerHTML = "";
  // iterate through each movie
  movies.forEach(movie => {
    // destructure movie object and grab title, image, score, overview
    const { title, poster_path, vote_average, overview } = movie;
    // create a div
    const movieEl = document.createElement("div");
    // add movie class to div
    movieEl.classList.add("movie");
    // inside div create elements like we hard coded in HTML, but replacing movie specific info
    movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByRating(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;
    // append movieEl to main
    main.appendChild(movieEl);
  });
}

// function to determine the class (color) for the rating based on the vote average
function getClassByRating(vote) {
  // if vote is 8 or more
  if (vote >= 8) {
    // green
    return "green";
    // if vote is 5 or more
  } else if (vote >= 5) {
    // orange
    return "orange";
    // otherwise
  } else {
    // red
    return "red";
  }
}

// listen for submit in the form
form.addEventListener("submit", e => {
  // prevent default so doesn't submit to page
  e.preventDefault();
  // value of search
  const searchTerm = search.value;
  // check to see if searchTerm exists and is not equal to blank
  if (searchTerm && searchTerm !== "") {
    // call getMovies on the search url with the search term
    getMovies(SEARCH_URL + searchTerm);
    // clear search value
    search.value = "";
    // otherwise (if submit blank search)
  } else {
    // reload the page
    window.location.reload();
  }
});
