import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItems from '../MovieItems'
import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    isLoadingFailed: false,
    popularList: [],
  }

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    const {match} = this.props
    console.log(match)
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.results.map(each => ({
        id: each.id,
        overview: each.overview,
        backdropPath: each.backdrop_path,
        title: each.title,
        posterPath: each.poster_path,
      }))
      this.setState({
        isLoading: false,
        popularList: formattedData,
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
      this.getPopularList,
    )
  }

  displayLoadingFailed = () => (
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
  )

  LoadingContainer = () => (
    <div className="popular-loading-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  displayMovieList = () => {
    const {popularList} = this.state

    return (
      <ul className="popular-movie-list">
        {popularList.map(each => (
          <MovieItems movieData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, isLoadingFailed} = this.state
    return (
      <div className="popular-bg-container">
        <div>
          <Header />
        </div>
        {isLoading && this.LoadingContainer()}
        {isLoadingFailed && this.displayLoadingFailed()}
        {!isLoading && !isLoadingFailed && this.displayMovieList()}
      </div>
    )
  }
}

export default Popular
