import Loader from 'react-loader-spinner'
import SearchContext from '../../context/SearchContext'
import MovieItems from '../MovieItems'
import Header from '../Header'
import './index.css'

const Search = () => (
  <SearchContext.Consumer>
    {value => {
      const {
        isLoading,
        isSearchFailed,
        isEmpty,
        searchResults,
        finalSearch,
        tryAgain,
      } = value

      console.log(isSearchFailed)

      const getEmptyMsg = () => (
        <div className="empty-container">
          <img
            className="empty-img"
            src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668442775/Group1_nzazvq.png"
            alt="no movies"
          />
          <p>Your search for {finalSearch} did not find any matches</p>
        </div>
      )

      const getLoader = () => (
        <div className="loading-search-container">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      )

      const displaySearchResults = () => (
        <ul className="list-search-results">
          {searchResults.map(each => (
            <MovieItems movieData={each} key={each.id} />
          ))}
        </ul>
      )

      const retry = () => {
        tryAgain()
      }

      const displayFailedView = () => (
        <div className="loading-failed-container">
          <img
            className="failed-img"
            src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668261406/Background-Complete1_z6vr7s.png"
            alt="failure view"
          />
          <p>Something went wrong. Please try again</p>
          <button className="popular-try-again" type="button" onClick={retry}>
            Try Again
          </button>
        </div>
      )

      return (
        <div className="search-bg-container">
          <div className="header">
            <Header />
          </div>

          {isEmpty && !isLoading && !isSearchFailed && getEmptyMsg()}
          {!isEmpty && isLoading && !isSearchFailed && getLoader()}
          {!isEmpty && !isLoading && !isSearchFailed && displaySearchResults()}
          {isSearchFailed && displayFailedView()}
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default Search
