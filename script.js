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

// Get initial movies on page load
getMovies(API_URL);

//async function
async function getMovies(url) {
  // res is promise returned from fetch
  const res = await fetch(url);
  // data is promise returned formatted as json
  const data = await res.json();

  console.log(data.results);
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
