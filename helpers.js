// Try and catch the API


// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres')

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById('genres').value;
  return selectedGenre;
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.querySelector('.moviePoster');
  const movieTextDiv = document.querySelector('.movieDetails');
  moviePosterDiv.innerHTML = '';
  movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement('img');
  posterImg.setAttribute('src', moviePosterUrl);
  posterImg.setAttribute('class', 'moviePoster');

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement('h1');
  titleHeader.setAttribute('class', 'movieTitle');
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for release date
const createReleaseDate = isoDate => {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();


  const relDate = document.createElement('p')
  relDate.setAttribute('class', 'relDate')
  relDate.innerHTML = `Released: ${day} ${month} ${year}`

  return relDate;
}

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement('p');
  overviewParagraph.setAttribute('id', 'movieOverview');
  overviewParagraph.innerHTML = overview;
  return overviewParagraph;
};

// Create HTML for IMDB Link
const createIMDBLink = imdb => {
  const imdbL = document.createElement('a');
  imdbL.setAttribute('href', `https://www.imdb.com/title/${imdb}`)
  imdbL.innerHTML = `<img src=resources/IMDb_Logo_Rectangle_Gold.png class="imdbimg" alt="IMDB">`;
  imdbL.classList.add('imdb')
  return imdbL;
}

// Create HTML for streaming platforms
const createStreamingList = list => {
  const streamingList = document.createElement('ul')
  streamingList.classList.add('streamList');
  list['flatrate'].forEach(el => {
    let item = document.createElement('li');
    item.innerHTML = `<img src=https://media.themoviedb.org/t/p/original/${el['logo_path']} alt=${el['provider_name']} class="streamImg">`;
    streamingList.appendChild(item);
  })
  return streamingList;
}

// Create HTML for embedded trailers
const createTrailerVideos = vidArr => {
  const trailerVideos = document.createElement('div')
  trailerVideos.classList.add('trailer')
  vidArr.forEach(el => {
    trailerVideos.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${el.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard - write; encrypted - media; gyroscope; picture -in -picture; web - share" referrerpolicy="strict - origin - when - cross - origin" allowfullscreen></iframe>`
  })
  return trailerVideos;
}

// Returns a random movie from the page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo, streamInfo, trailer) => {
  const moviePosterDiv = document.querySelector('.moviePoster');
  const movieTextDiv = document.querySelector('.movieDetails');

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const releaseDate = createReleaseDate(movieInfo.release_date)
  const overviewText = createMovieOverview(movieInfo.overview);
  const IMDBlink = createIMDBLink(movieInfo.imdb_id)
  const streamingInfo = createStreamingList(streamInfo)
  const trailerVideos = createTrailerVideos(trailer)

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(releaseDate);
  movieTextDiv.appendChild(overviewText);
  movieTextDiv.appendChild(IMDBlink)
  movieTextDiv.appendChild(streamingInfo);
  movieTextDiv.appendChild(trailerVideos)

};

// const streamingInfo = (streaming) => {
//   const streamingDiv = document.querySelector('.streamingPlatforms')
//   const movieTextDiv = document.querySelector('.movieText');
//   const streamingInfo = createStreamingList(streaming);

//   streamingDiv.appendChild(streamingInfo);


// }