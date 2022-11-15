import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'
import Header from '../Header'
import './index.css'

const Account = props => (
  <SearchContext.Consumer>
    {value => {
      const {username} = value
      console.log(username)

      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      return (
        <div className="account-background">
          <div>
            <Header />
          </div>
          <div className="account-information-container">
            <div className="account-container">
              <h1>Account</h1>
              <hr className="line" />
              <div className="acc-details">
                <p className="details-para">Member ship</p>
                <div className="user-password">
                  <p>{username}@gmail.com</p>
                  <p className="details-para">Password : *********</p>
                </div>
              </div>
              <hr className="line" />
              <div className="acc-details">
                <p className="details-para">Plan Details</p>
                <div className="acc-plan">
                  <p>Premium</p>
                  <p className="para-ultra">Ultra Hd</p>
                </div>
              </div>
              <hr className="line" />
              <button className="logout-btn" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
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
    }}
  </SearchContext.Consumer>
)

export default Account
