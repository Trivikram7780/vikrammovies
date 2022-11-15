import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import SearchContext from './context/SearchContext'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Search from './components/Search'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'
import Account from './components/Account'
import './App.css'

class App extends Component {
  state = {
    username: '',
    password: '',
    finalSearch: '',
    search: '',
    isEmpty: false,
    isLoading: false,
    searchResults: [],
    isSearchFailed: false,
    isSearch: false,
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      isSearch: !prevState.isSearch,
    }))
  }

  saveUsername = value => {
    this.setState({
      username: value,
    })
  }

  savePassword = value => {
    this.setState({
      password: value,
    })
  }

  updateSearch = value => {
    this.setState({
      search: value,
    })
  }

  getSearchResults = () => {
    const {search} = this.state
    this.setState(
      {
        isEmpty: false,
        isLoading: true,
        finalSearch: search,
      },
      this.requestSearchResults,
    )
  }

  tryAgain = () => {
    this.setState(
      {
        isLoading: true,
        isSearchFailed: false,
        isEmpty: false,
      },
      this.getSearchResults,
    )
  }

  requestSearchResults = async () => {
    const {finalSearch} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${finalSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      if (data.total === 0) {
        this.setState({
          isLoading: false,
          isEmpty: true,
          isSearchFailed: false,
        })
      } else {
        const formattedData = data.results.map(each => ({
          id: each.id,
          backdropPath: each.backdrop_path,
          posterPath: each.poster_path,
          title: each.title,
        }))
        this.setState({
          isLoading: false,
          isEmpty: false,
          searchResults: formattedData,
          isSearchFailed: false,
        })
      }
    } else {
      this.setState({
        isLoading: false,
        isSearchFailed: true,
        isEmpty: false,
      })
    }
  }

  render() {
    const {
      search,
      isSearch,
      isLoading,
      isSearchFailed,
      searchResults,
      isEmpty,
      finalSearch,
      username,
      password,
    } = this.state

    return (
      <SearchContext.Provider
        value={{
          search,
          isSearch,
          isLoading,
          isSearchFailed,
          searchResults,
          isEmpty,
          finalSearch,
          username,
          password,
          savePassword: this.savePassword,
          saveUsername: this.saveUsername,
          getSearchResults: this.getSearchResults,
          toggleSearch: this.toggleSearch,
          updateSearch: this.updateSearch,
          tryAgain: this.tryAgain,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route component={NotFound} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
