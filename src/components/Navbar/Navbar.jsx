import './Navbar.css'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header>
      <div id="brand-logo">
        <Link to="/">🐦</Link>
      </div>

      <nav>
        <Link to="/sign-in">Sign in</Link>
        <Link to="/sign-up">Create an account</Link>
      </nav>
    </header>
  )
}

export default Navbar