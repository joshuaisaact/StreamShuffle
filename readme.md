# ShuffleStream

**ShuffleStream** is a simple and fun project built to help me learn and practice making API calls in JavaScript. Not sure what to watch? ShuffleStream selects a random movie from your favorite genre and shows its streaming availability, detailed info, and even a trailer. All powered by making calls to a custom API backend, powered by The Movie DB. 

The API calls are to a backend hosted using Render, built in Express (see separate github repository for the backend). This backend passes an API key to The Movie DB.

## Features

- **Genre Selection**: Choose a genre and let the app pick a random movie for you.
- **Random Movie Info**: Get detailed information about a randomly selected movie, including title, overview, and release date.
- **Streaming Availability**: See where the movie is available for streaming, focusing on platforms offering free (flatrate) streaming, in the UK.
- **Movie Trailer**: Watch a trailer for the randomly selected movie.

## How it Works

ShuffleStream works by making several API calls to fetch data about movies:

1. **Get Genres**: The app first fetches a list of genres from the API and populates a dropdown menu.
2. **Get Movies**: Once a genre is selected, the app fetches a list of movies from the chosen genre.
3. **Get Movie Details**: After randomly selecting a movie from the list, the app fetches detailed information about that movie.
4. **Get Trailer**: A trailer link for the movie is fetched from the API.
5. **Get Streaming Info**: The app fetches information about where the movie can be streamed, focusing on free streaming platforms.

## Code Overview

### JavaScript

The application logic is powered by JavaScript, utilizing asynchronous API calls and DOM manipulation to display information to the user.

- **API Calls**: The app makes several asynchronous calls to fetch genres, movies, and streaming details from the API.
- **DOM Manipulation**: The app dynamically updates the content of the page, including the genre dropdown, movie details, and streaming info.

### CSS

The app has a simple, dark theme styled with CSS, with some glowing button effects and animations to make it visually engaging.

### HTML

The structure of the app is defined by a minimal HTML layout, which is dynamically updated as new data is fetched from the API.

## Installation & Setup

To run ShuffleStream locally:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/your-repo/shufflestream.git
   ```

2. Navigate to the project folder:
   
   ```bash
   cd shufflestream
   ```

3. Open the `index.html` file in your browser:
   
   ```bash
   open index.html
   ```
   
   or use Live Server in VSCode to run the project.

## Future Enhancements

- **More Genres**: Expand the genre selection to offer more variety.
- **User Ratings**: Let users rate the randomly selected movie.
- **Custom Movie Shuffle**: Allow users to shuffle based on custom filters like year, rating, or director.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy discovering random movies with ShuffleStream!
