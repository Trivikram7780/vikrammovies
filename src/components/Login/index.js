import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import SearchContext from '../../context/SearchContext'
import './index.css'

class Login extends Component {
  state = {
    isFailed: false,
    errorMsg: '',
    username: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isFailed: true,
      errorMsg,
    })
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {isFailed, errorMsg, username, password} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {savePassword, saveUsername} = value

          const changeUsername = event => {
            this.setState(
              {
                username: event.target.value,
              },
              saveUsername(event.target.value),
            )
          }

          const changePassword = event => {
            this.setState(
              {
                password: event.target.value,
              },
              savePassword(event.target.value),
            )
          }

          const onLogin = async event => {
            event.preventDefault()
            const userDetails = {
              username,
              password,
            }
            const url = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
              this.onSubmitSuccess(data.jwt_token)
            } else {
              this.onSubmitFailure(data.error_msg)
            }
          }

          return (
            <div className="login-page-container">
              <div className="login-header-section">
                <img
                  className="movie-logo"
                  src="https://res.cloudinary.com/dmafozp8x/image/upload/v1668079439/Group_7399_2x_agjfqz.png"
                  alt="login website logo"
                />
              </div>
              <div className="login-bg-form-container">
                <form className="login-form-container" onSubmit={onLogin}>
                  <p className="login-head">Login</p>

                  <label htmlFor="username" className="label-name">
                    USERNAME
                  </label>
                  <div className="username-container">
                    <input
                      className="username-input"
                      value={username}
                      type="text"
                      id="username"
                      onChange={changeUsername}
                    />
                  </div>
                  <label htmlFor="password" className="label-password">
                    PASSWORD
                  </label>
                  <div className="username-container">
                    <input
                      className="username-input"
                      value={password}
                      type="password"
                      id="password"
                      onChange={changePassword}
                    />
                  </div>
                  {isFailed && <p className="error-msg">{errorMsg}</p>}
                  <button className="login-btn" type="submit">
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Login
