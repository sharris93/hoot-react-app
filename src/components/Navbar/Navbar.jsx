import './Navbar.css'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const Navbar = () => {
  const { user, signOut } = useContext(UserContext)

  return (
    <header>
      <div id="brand-logo">
        <Link to="/">🐦</Link>
      </div>

      <nav>
        <Link to="/hoots">All Hoots</Link>
        { user
          ? (
            <>
              <Link to="/hoots/new">Create a hoot</Link>
              <Link to="/sign-in" onClick={signOut}>Sign out</Link>
            </>
          )
          : (
            <>
              <Link to="/sign-in">Sign in</Link>
              <Link to="/sign-up">Create an account</Link>
            </>
            )
        }
      </nav>
    </header>
  )
}

export default Navbar