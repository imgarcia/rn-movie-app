import axios from 'axios'
import { apiKey } from '../src/constants'

// images uri
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg'
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU'

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
export const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US`

// dynamic endpoints
const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?language=en-US`

const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?language=en-US`
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?language=en-US`

const apiCall = async (endpoint, params) => {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTgyZWUzNWNkZDZjMDc3MDEzMjJkNWMwMGNmOWY5YyIsInN1YiI6IjY1N2NhODAxN2VjZDI4MDBhZDI0YTM0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HA0pkHXlLhBITclu85MwoVagc_daesyz6JRS1xxsTzE',
    },
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log('error is: ', error)
    return {}
  }
}

// home screen apis
export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint)
}

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint)
}

// movie screen apis
export const fetchMovieDetails = ({ id }) => apiCall(movieDetailsEndpoint(id))

export const fetchMovieCredits = ({ id }) => apiCall(movieCreditsEndpoint(id))

export const fetchSimilarMovies = ({ id }) => apiCall(similarMoviesEndpoint(id))
