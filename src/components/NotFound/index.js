import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-head">Lost Your Way ?</h1>
      <p className="not-found-para">
        We are sorry the page you requested could not be found{' '}
      </p>
      <p className="not-found-para">Please go back to the homepage.</p>
      <button className="go-to-home" type="button" onClick={goToHome}>
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
