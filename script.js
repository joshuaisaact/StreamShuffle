const mykey = config.MY_KEY;
const secretkey = config.SECRET_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3/'

const playBtn = document.querySelector('.playBtn');

// Pull a list of genres from the API
const getGenres = async () => {
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/genres`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch movies failed:', error);
  }
}

// Pull a list of movies from the API (random page from 1 to 100)
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/movies?genre=${selectedGenre}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch movies failed:', error);
  }
}

// Grab detailed information about a random film
const getMovieInfo = async (movie) => {
  const movieID = movie.id;
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/movie-info/${movieID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch movie info failed:', error);
  }
};

// Get a film trailer link from the Videos endpoint
const getTrailer = async (movie) => {
  const movieID = movie.id;
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/movie-trailer/${movieID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch movie trailer failed:', error);
  }
}

// Get streaming platform availability information from a different endpoint
const getStreamingPlatforms = async (movie) => {
  const movieID = movie.id;
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/movie-streaming/${movieID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch streaming platforms failed:', error);
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
  if (streaming.flatrate) {
    displayMovie(info, streaming, trailer);
  } else {
    console.log('No flatrate streaming info available, retrying...');
    showRandomMovie();
  }

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;