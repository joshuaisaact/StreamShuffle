const playBtn = document.querySelector('.playBtn');
const loadAni = document.querySelector('.loader-container')

// Pull a list of genres from the API
const getGenres = async () => {
  try {
    const response = await fetch(`https://stream-shuffle-server.onrender.com/api/genres`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
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
    // console.log('Raw Response:', await response.text());
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
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
  let randomMovie;
  let info;
  let trailer;
  let streaming;

  while (true) {
    randomMovie = getRandomMovie(movies);
    info = await getMovieInfo(randomMovie);
    trailer = await getTrailer(randomMovie);
    streaming = await getStreamingPlatforms(randomMovie);

    if (streaming && streaming.flatrate) {
      break;

    } else {
      console.log('No flatrate streaming info available, retrying...');
    }
  }
  loadAni.classList.add('hidden')
  displayMovie(info, streaming, trailer);

  if (movieInfo) {
    movieInfo.scrollIntoView({ behavior: 'smooth' });
  }
};

getGenres().then(populateGenreDropdown);
// playBtn.onclick = showRandomMovie;
playBtn.addEventListener('click', () => {
  loadAni.classList.remove('hidden')
  showRandomMovie();
})