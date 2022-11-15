import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import SearchComponent from '../SearchComponent'
import './index.css'

const Header = props => {
  const {match} = props
  const {path} = match
  console.log(path)

  if (path === '/search') {
    Cookies.set('isSearch', true)
  } else {
    Cookies.set('isSearch', false)
  }

  const onSearchBtn = () => {
    const {history} = props
    history.push('/search')
  }

  const isSearch = Cookies.get('isSearch')
  console.log(isSearch)

  return (
    <nav className="header-container">
      <ul className="header-left-section">
        <li>
          <Link to="/" className="link-route">
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668079439/Group_7399_2x_agjfqz.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <Link to="/" className="routes">
            Home
          </Link>
        </li>
        <li>
          <Link to="/popular" className="routes">
            Popular
          </Link>
        </li>
      </ul>
      <div className="right-section">
        {isSearch !== 'true' && (
          <button className="search-btn" type="button" onClick={onSearchBtn}>
            <HiOutlineSearch className="search" />
          </button>
        )}
        {isSearch === 'true' && <SearchComponent />}
        <Link to="/account">
          <img
            className="profile-img"
            src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668164465/Avatar5_z9zxhw.png"
            alt="profile"
          />
        </Link>
      </div>
    </nav>
  )
}

export default withRouter(Header)
