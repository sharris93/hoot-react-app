import './Home.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const Home = () => {
  // Context
  const { user } = useContext(UserContext)
  console.log('User:', user)

  return (
    <h1>{ user ? `Welcome back, ${user.username}` : 'Welcome, guest'}</h1>
  )
}

export default Home