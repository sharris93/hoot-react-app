import { useState } from 'react'
import './SignUp.css'
import { signUpService } from '../../services/auth'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errorData, setErrorData] = useState({})

  // Location variables
  const navigate = useNavigate()

  // Functions
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorData({ ...errorData, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Send API a sign up request
      await signUpService(formData)

      // On success, navigate the user to the sign in page
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.' })
      } else {
        setErrorData(error.response.data)
      }
    }
  }

  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-control">
          <label hidden htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder='Username' onChange={handleChange} required />
          { errorData.username && <p className='error-message'>{errorData.username}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder='Email' onChange={handleChange} required />
          { errorData.email && <p className='error-message'>{errorData.email}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange} required />
          { errorData.password && <p className='error-message'>{errorData.password}</p> }
        </div>

        <div className="form-control">
          <label hidden htmlFor="confirmPassword">Re-type your password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Re-type your password' onChange={handleChange} required />
          { errorData.confirmPassword && <p className='error-message'>{errorData.confirmPassword}</p> }
        </div>

        <button type="submit">Create account</button>

        {errorData.message && <p className='error-message'>{errorData.message}</p> }
      </form>
    </>
  )
}

export default SignUp