import {useEffect, useRef} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import SearchContext from '../../context/SearchContext'
import './index.css'

const SearchComponent = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
    inputRef.current.select()
  }, [])

  return (
    <SearchContext.Consumer>
      {value => {
        const {search, updateSearch, getSearchResults} = value

        const onSearchChange = event => {
          updateSearch(event.target.value)
        }

        const sendRequest = event => {
          if (event.key === 'Enter') {
            getSearchResults()
          }
        }

        const onReqSearch = () => {
          getSearchResults()
        }

        return (
          <div className="search-container">
            <input
              className="search-element"
              placeholder="search"
              ref={inputRef}
              value={search}
              onChange={onSearchChange}
              onKeyDown={sendRequest}
            />
            <button
              className="search-req-btn"
              type="button"
              onClick={onReqSearch}
            >
              <HiOutlineSearch className="search" />
            </button>
          </div>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default SearchComponent
