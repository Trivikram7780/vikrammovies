import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1444,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    isTrendLoading: true,
    isOriginalsLoading: true,
    isOriginalFailed: false,
    isTrendFailed: false,
    trendingList: [],
    originalList: [],
    individualItem: {},
  }

  componentDidMount() {
    this.getTrendingList()
    this.getOriginalList()
  }

  getOriginalList = async () => {
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedOriginalsData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const random = Math.floor(Math.random() * formattedOriginalsData.length)

      this.setState({
        isOriginalsLoading: false,
        originalList: formattedOriginalsData,
        individualItem: formattedOriginalsData[random],
      })
    } else {
      this.setState({
        isOriginalsLoading: false,
        isOriginalFailed: true,
      })
    }
  }

  getTrendingList = async () => {
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        isTrendLoading: false,
        trendingList: formattedData,
      })
    } else {
      this.setState({
        isTrendLoading: false,
        isTrendFailed: true,
      })
    }
  }

  tryOriginal = () => {
    this.setState(
      {
        isOriginalsLoading: true,
        isOriginalFailed: false,
      },
      this.getOriginalList,
    )
  }

  getBannerLoading = () => {
    const {isOriginalsLoading, isOriginalFailed} = this.state
    console.log(isOriginalFailed)

    return (
      <div className="loading-banner-container">
        {isOriginalsLoading && (
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        )}
        {isOriginalFailed && (
          <div className="retry-container">
            <img
              className="alert"
              src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668431471/alert-triangle1_rqqnn3.png"
              alt="alert"
            />
            <p className="fail-para">Something went wrong. Please try again</p>
            <button
              className="try-again"
              type="button"
              onClick={this.tryOriginal}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  tryTrend = () => {
    this.setState(
      {
        isTrendLoading: true,
        isTrendFailed: false,
      },
      this.getTrendingList,
    )
  }

  getTrendLoading = () => {
    const {isTrendFailed, isTrendLoading} = this.state
    return (
      <div className="loading-container">
        {isTrendLoading && (
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        )}
        {isTrendFailed && (
          <div className="retry-container">
            <img
              className="alert"
              src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668431471/alert-triangle1_rqqnn3.png"
              alt="alert"
            />
            <p className="fail-para">Something went wrong. Please try again</p>
            <button className="try-again" type="button" onClick={this.tryTrend}>
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  getOriginalLoading = () => {
    const {isOriginalFailed, isOriginalsLoading} = this.state
    return (
      <div className="loading-container">
        {isOriginalsLoading && (
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        )}
        {isOriginalFailed && (
          <div className="retry-container">
            <img
              className="alert"
              src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668431471/alert-triangle1_rqqnn3.png"
              alt="alert"
            />
            <p className="fail-para">Something went wrong. Please try again</p>
            <button
              className="try-again"
              type="button"
              onClick={this.tryOriginal}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  loadBannerDetails = () => {
    const {individualItem} = this.state
    const {title, id, overview} = individualItem

    return (
      <div className="movie-desc">
        <p className="banner-head">{title}</p>
        <p className="banner-para">{overview}</p>
        <Link to={`/movies/${id}`}>
          <button className="play-btn" type="button">
            Play
          </button>
        </Link>
      </div>
    )
  }

  getSilk = list => (
    <Slider {...settings}>
      {list.map(each => {
        const {id, backdropPath, title} = each

        return (
          <div className="slick-item" key={id}>
            <Link to={`/movies/${id}`}>
              <img className="logo-image" src={backdropPath} alt={title} />
            </Link>
          </div>
        )
      })}
    </Slider>
  )

  render() {
    const {
      isTrendLoading,
      isOriginalsLoading,
      trendingList,
      originalList,
      individualItem,
      isOriginalFailed,
      isTrendFailed,
    } = this.state

    const {backdropPath} = individualItem

    return (
      <div className="home-bg-container">
        <div
          className="banner-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <Header />
          </div>
          {!isOriginalsLoading && !isOriginalFailed && this.loadBannerDetails()}
          {(isOriginalsLoading || isOriginalFailed) && this.getBannerLoading()}
        </div>
        <div className="trending-section">
          <p className="trend-head">Trending Now</p>
          {(isTrendLoading || isTrendFailed) && this.getTrendLoading()}
          {!isTrendLoading && this.getSilk(trendingList)}
        </div>
        <div className="original-section">
          <p className="original-head">Originals</p>
          {(isOriginalsLoading || isOriginalFailed) &&
            this.getOriginalLoading()}
          {!isOriginalsLoading && this.getSilk(originalList)}
        </div>
        <div className="contact-section">
          <FaGoogle />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </div>
        <p className="contact">Contact Us</p>
      </div>
    )
  }
}

export default Home
