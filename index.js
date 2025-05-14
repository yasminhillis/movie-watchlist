const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieContainer = document.getElementById("movie-container");
const movieList = document.getElementById("movie-list");
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

searchBtn.addEventListener("click", function () {
  fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=2a564644`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        handleInvalidInput();
        return;
      }

      movieList.innerHTML = "";
      for (movie of data.Search) {
        getMovieDetails(movie.imdbID);
      }
    });
});

function getMovieDetails(movieId) {
  fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=2a564644`)
    .then((res) => res.json())
    .then((movie) => {
      generateMovieHtml(movie);
    });
}

function generateMovieHtml(movie) {
  return (movieList.innerHTML += `
     <div class="movie-item" id="movie-container" data-id=${movie.imdbID}>
        <img class="movie-poster" src="${movie.Poster}" alt="" />
          <div class="movie-details">
            <div class="title-rating">
              <h4 class="movie-title">${movie.Title}</h4>
              <div class="movie-rating">
                <svg
                  class="rating-icon"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z"
                    fill="#FEC654"
                  />
                </svg>
                <span class="rating-value">${movie.imdbRating}</span>
              </div>
            </div>

            <div class="duration-genre-watchlistBtn">
              <span class="movie-runtime">${movie.Runtime}</span>
              <span class="movie-genre">${movie.Genre}</span>
              <div class="watchlist-btn">
              ${
                watchlist.some((obj) => obj.movieId === movie.imdbID)
                  ? `<div class="in-watchlist">
                In Watchlist
                </div>
`
                  : `<svg
                  class="add-btn"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z"
                    fill="#111827"
                  />
                </svg>
                Watchlist`
              }
              
              </div>
            </div>

            <div class="movie-plot">
              ${movie.Plot}
            </div>
          </div>
          </div>
    `);
}

document.addEventListener("click", function (e) {
  if (localStorage.getItem("in-watchlist")) return;
  const watchBtn = e.target.closest(".watchlist-btn", ".add-btn");
  if (!watchBtn) return;

  if (watchBtn) {
    let movieId = e.target.closest(".movie-item").dataset.id;
    let movieItem = e.target.closest(".movie-item");
    let moviePoster = movieItem.querySelector(".movie-poster").src;
    let movieTitle = movieItem.querySelector(".movie-title").textContent;
    let movieRating = movieItem.querySelector(".rating-value").textContent;
    let movieRuntime = movieItem.querySelector(".movie-runtime").textContent;
    let movieGenre = movieItem.querySelector(".movie-genre").textContent;
    let moviePlot = movieItem.querySelector(".movie-plot").textContent;
    let inWatchlist = true;

    let newMovieObj = {
      movieId,
      moviePoster,
      movieTitle,
      movieRating,
      movieRuntime,
      movieGenre,
      moviePlot,
      inWatchlist,
    };

    watchlist.push(newMovieObj);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    watchBtn.innerHTML = `
    <svg class="green-tick" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fill="#181" fill-rule="evenodd" clip-rule="evenodd"
        d="M6.00008 10.2002L3.80008 8.00016L2.86675 8.9335L6.00008 12.0668L14.0001 4.06683L13.0667 3.1335L6.00008 10.2002Z"/>
    </svg> Added!`;

    setTimeout(() => {
      watchBtn.textContent = "In Watchlist";
      watchBtn.classList.add("in-watchlist");
    }, 900);
  }
});

function handleInvalidInput() {
  movieList.innerHTML = `<h4 class="invalid-input">Unable to find what you’re looking for. Please try another search.</h4>`;
}
