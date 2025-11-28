import './CommentCreate.css'
import { useState } from 'react'
import { commentCreate } from '../../services/hoots'

const CommentCreate = ({ hootId, setHoot }) => {
  const [formData, setFormData] = useState({
    text: ''
  })
  const [errorData, setErrorData] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await commentCreate(hootId, formData)
      setHoot((prevStateValue) => {
        return { ...prevStateValue, comments: [ ...prevStateValue.comments, data ] }
      })
      setFormData({ text: '' })
    } catch (error) {
      console.log(error)
      setErrorData(error.response.data)
    }
  }

  return (
    <section id="comment-form-section">
      <h2>Leave a comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label hidden htmlFor="text">Text</label>
          <textarea name="text" id="text" placeholder='Leave a comment...' required onChange={(e) => setFormData({ text: e.target.value })} value={formData.text}></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </section>
  )
}

export default CommentCreate