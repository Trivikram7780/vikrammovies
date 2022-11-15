import {Link} from 'react-router-dom'
import './index.css'

const MovieItems = props => {
  const {movieData} = props

  const {id, posterPath, title} = movieData

  return (
    <li className="individual-movie">
      <Link to={`/movies/${id}`}>
        <img className="movie-img" src={posterPath} alt={title} />
      </Link>
    </li>
  )
}

export default MovieItems
