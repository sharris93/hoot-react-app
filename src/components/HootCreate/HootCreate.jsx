import { useState, useContext } from 'react'
import './HootCreate.css'
import { hootCreate } from '../../services/hoots'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const HootCreate = () => {
  // Context
  const { user } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News"
  })
  const [errorData, setErrorData] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Consume the service function (API)
      const { data } = await hootCreate(formData)
      navigate(`/hoots/${data._id}`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response.data)
    }
  }


  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return (
    <>
      <h1>What's on your mind?</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label hidden htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder='Title' required value={formData.title} onChange={handleChange} />
          { errorData.title && <p className='error-message'>{errorData.title}</p>}
        </div>

        <div className="form-control">
          <label hidden htmlFor="text">Text</label>
          <textarea name="text" id="text" placeholder="Text" required value={formData.text} onChange={handleChange}></textarea>
          { errorData.text && <p className='error-message'>{errorData.text}</p>}
        </div>

        <div className="form-control">
          <label hidden htmlFor="category">Category</label>
          <select name="category" id="category" required value={formData.category} onChange={handleChange}>
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Games">Games</option>
            <option value="Movies">Movies</option>
            <option value="Music">Music</option>
            <option value="Television">Television</option>
          </select>
          { errorData.category && <p className='error-message'>{errorData.category}</p>}
        </div>

        <button type="submit">Create Hoot</button>

        { errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default HootCreate