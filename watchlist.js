let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
const movieList = document.getElementById('movie-list');

console.log(movieList, 'movieList');
console.log(watchlist.length);

function getMovies () {
    let html = '';
    if (watchlist.length > 0) {
    watchlist.map(movie => {
        html += `
        <div class="movie-item" data-id=${movie.movieId}>
          <img class="movie-poster" src="${movie.moviePoster}" alt="" />
          <div class="movie-details">
            <div class="title-rating">
              <h4 class="movie-title">${movie.movieTitle}</h4>
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
                <span class="rating-value">${movie.movieRating}</span>
              </div>
            </div>

            <div class="duration-genre-watchlistBtn">
              <span>${movie.movieRuntime}</span>
              <span>${movie.movieGenre}</span>
              <div class="watchlist-btn remove-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
                    </svg>
                    Remove
              </div>
            </div>

            <div class="movie-plot">
                ${movie.moviePlot}             
            </div>
          </div>
        </div>
        
        `
    })
    movieList.innerHTML = html
  }
}

getMovies()

document.addEventListener('click', function(e){
    let movieId = e.target.closest('.movie-item').dataset.id;
    
    if (e.target.closest('.remove-btn')) {
        watchlist = watchlist.filter(item => item.movieId !== movieId)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))

        getMovies ()
    }
})