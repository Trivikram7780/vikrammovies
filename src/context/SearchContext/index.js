import React from 'react'

const SearchContext = React.createContext({
  search: '',
  isSearch: false,
  username: '',
  password: '',
  isEmpty: false,
  isLoading: false,
  isSearchFailed: false,
  searchResults: [],
  finalSearch: '',
  getSearchResults: () => {},
  toggleSearch: () => {},
  updateSearch: () => {},
  tryAgain: () => {},
  saveUsername: () => {},
  savePassword: () => {},
})

export default SearchContext
