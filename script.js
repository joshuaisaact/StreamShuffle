const mykey = config.MY_KEY;
const secretkey = config.SECRET_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3/'

const playBtn = document.querySelector('.playBtn');

// Pull a list of genres from the API
const getGenres = async () => {
  const genreRequestEndpoint = 'genre/movie/list';
  const requestParams = `?api_key=${secretkey}`
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonresponse = await response.json();
      const genres = await jsonresponse.genres;
      return genres;
    }
  }
  catch (error) {
    console.log(error);
  }
};

// Pull a list of movies from the API (random page from 1 to 100)
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = 'discover/movie';
  const requestParams = `?api_key=${secretkey}&with_genres=${selectedGenre}&region=GB&page=${Math.trunc(Math.random() * 100) + 1}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonresponse = await response.json();
      const movies = jsonresponse.results;
      console.log(movies)
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

// Grab detailed information about a random film
const getMovieInfo = async (movie) => {
  const movieID = movie.id;
  const movieEndpoint = `movie/${movieID}`;
  const requestParams = `?api_key=${secretkey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      console.log(movieInfo);
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Get a film trailer link from the Videos endpoint
const getTrailer = async (movie) => {
  const movieID = movie.id;
  const movieEndpoint = `movie/${movieID}/videos`;
  const requestParams = `?api_key=${secretkey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      let trailerInfo = await response.json();
      trailerInfo = trailerInfo.results;
      console.log(trailerInfo);
      return trailerInfo;
    }
  } catch (error) {
    console.log(error);
  }
}

// Get streaming platform availability information from a different endpoint
const getStreamingPlatforms = async (movie) => {
  const movieID = movie.id;
  const movieEndpoint = `movie/${movieID}/watch/providers`;
  const requestParams = `?api_key=${secretkey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const streamingInfo = await response.json();
      console.log(streamingInfo.results['GB'])
      return streamingInfo;
    }
  } catch (error) {
    showRandomMovie();
  }
}


// Gets a list of movies and ultimately displays the info of a random movie from the list, that has free streaming
const showRandomMovie = async () => {
  const movieInfo = document.querySelector('.movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  const trailer = await getTrailer(randomMovie)
  const streaming = await getStreamingPlatforms(randomMovie)

  if (streaming && streaming.results && streaming.results['GB'] && streaming.results['GB'].flatrate) {
    displayMovie(info, streaming.results['GB'], trailer);
  } else {
    console.log('No flatrate streaming info available, retrying...');
    // if (retryCount < MAX_RETRIES) {
    showRandomMovie(); // Retry if flatrate is undefined
    // } else {
    //   console.log('Max retries reached. Could not find a movie with flatrate streaming.');
    // }
  }

  // displayMovie(info, streaming.results['GB']);
  // streamingInfo(streaming.results['GB']);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;