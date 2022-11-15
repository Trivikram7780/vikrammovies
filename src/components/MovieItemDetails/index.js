import {Component} from 'react'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieItems from '../MovieItems'
import './index.css'

class MovieItemDetails extends Component {
  state = {
    isLoading: true,
    movieDetails: {},
    isLoadingFailed: false,
  }

  componentDidMount() {
    this.getMovieItemsDetails()
  }

  componentDidUpdate(prevProp) {
    const {match} = this.props
    if (prevProp.match.params.id !== match.params.id) {
      this.getMovieItemsDetails()
    }
  }

  getMovieItemsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.movie_details.id,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        adult: data.movie_details.adult,
        posterPath: data.movie_details.poster_path,
        runTime: data.movie_details.runtime,
        overview: data.movie_details.overview,
        releaseDate: data.movie_details.release_date,
        similarMovies: data.movie_details.similar_movies.map(each => ({
          id: each.id,
          backdropPath: each.backdrop_path,
          posterPath: each.poster_path,
          title: each.title,
        })),
        title: data.movie_details.title,
        spokenLanguages: data.movie_details.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        isLoading: false,
        movieDetails: formattedData,
      })
    } else {
      this.setState({
        isLoading: false,
        isLoadingFailed: true,
      })
    }
  }

  tryAgain = () => {
    this.setState(
      {
        isLoading: true,
        isLoadingFailed: false,
      },
      this.getMovieItemsDetails,
    )
  }

  getSuccessView = () => {
    const {movieDetails} = this.state
    const {
      backdropPath,
      title,
      overview,
      adult,
      runTime,
      releaseDate,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      similarMovies,
    } = movieDetails

    const releasing = new Date(releaseDate)
    const releasedsOn = format(new Date(releaseDate), 'PPP')

    const yearOfRelease = releasing.getFullYear()

    return (
      <>
        <div className="bg-banner-height">
          <div
            className="movie-bg-container"
            style={{
              backgroundImage: `url(${backdropPath})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div>
              <Header />
            </div>
            <div className="movie-desc">
              <h1 className="banner-head">{title}</h1>
              <div className="runtime-release">
                <p>{runTime} min</p>
                <div className="rated">
                  {adult && <span>A</span>}
                  {!adult && <span>U/A</span>}
                </div>
                <p>{yearOfRelease}</p>
              </div>

              <p className="banner-para">{overview}</p>

              <button className="play-btn" type="button">
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="description-of-movie">
          <ul className="genres">
            <p className="desc-head">Genres</p>
            {genres.map(each => (
              <li key={each.id}>
                <span>{each.name}</span>
              </li>
            ))}
          </ul>
          <ul className="genres">
            <p className="desc-head">Audio Available</p>
            {spokenLanguages.map(each => (
              <li key={each.id}>
                <span>{each.englishName}</span>
              </li>
            ))}
          </ul>
          <div className="genres">
            <p className="desc-head">Rating Count</p>
            <span>{voteCount}</span>
            <p className="desc-head">Rating Average</p>
            <span>{voteAverage}</span>
          </div>
          <div className="genres">
            <p className="desc-head">Budget</p>
            <span>{budget}</span>
            <p className="desc-head">Release Date</p>
            <span>{releasedsOn}</span>
          </div>
        </div>
        {similarMovies.length !== 0 && (
          <div className="similar-section">
            <p className="similar-head">More Like this</p>
            <ul className="similar-movies">
              {similarMovies.map(each => (
                <MovieItems movieData={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
        <div className="contact-section">
          <FaGoogle />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
        <p className="contact">Contact Us</p>
      </>
    )
  }

  getFailedView = () => (
    <>
      <div>
        <Header />
      </div>
      <div className="loading-failed-container">
        <img
          className="failed-img"
          src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668261406/Background-Complete1_z6vr7s.png"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          className="popular-try-again"
          type="button"
          onClick={this.tryAgain}
        >
          Try Again
        </button>
      </div>
    </>
  )

  getLoadingContainer = () => (
    <>
      <div>
        <Header />
      </div>
      <div className="details-loading-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  render() {
    const {isLoading, isLoadingFailed} = this.state

    return (
      <div className="movie-details-container">
        {!isLoading && !isLoadingFailed && this.getSuccessView()}
        {isLoading && this.getLoadingContainer()}
        {isLoadingFailed && this.getFailedView()}
      </div>
    )
  }
}

export default MovieItemDetails
