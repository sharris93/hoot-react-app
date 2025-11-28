import './DeleteHoot.css'
import { useState } from 'react'
import spinnerGIF from '../../assets/spinner.gif'
import { hootDelete } from '../../services/hoots'
import { useNavigate } from 'react-router'

const DeleteHoot = ({ hootId }) => {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await hootDelete(hootId)
      navigate('/hoots')
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.' })
      } else {
        setErrorData(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleDelete}>
        Delete Hoot
      </button>
      {errorData.message && <p className='error-message'>{errorData.message}</p>}
    </>
  )
}

export default DeleteHoot