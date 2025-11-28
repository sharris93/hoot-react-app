import './HootDetails.css'
import { useParams, useNavigate } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { hootShow } from '../../services/hoots'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import DeleteHoot from '../DeleteHoot/DeleteHoot'
import { UserContext } from '../../contexts/UserContext'
import CommentCreate from '../CommentCreate/CommentCreate'
import CommentFeed from '../CommentFeed/CommentFeed'

const HootDetails = () => {
  // Context
  const { user } = useContext(UserContext)

  // State
  const [hoot, setHoot] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

  const { hootId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await hootShow(hootId)
        setHoot(data)
      } catch (error) {
        console.log(error)
        if (error.response.status === 500) {
          setErrorData({ message: 'Something went wrong. Please try again' })
        } else if (error.response.status === 404) {
          navigate('/page-not-found')
        } else {
          setErrorData(error.response.data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [hootId, navigate])

  return (
    <>
      { errorData.message 
        ? <p className='error-message'>{errorData.message}</p>
        : isLoading
          ? <LoadingIcon />
          : hoot
            ? (
              <>
                <section className='post-content'>
                  <h1>{hoot.title}</h1>
                  <h2>{hoot.category}</h2>
                  <p>{hoot.text}</p>
                  { user._id === hoot.author._id && <DeleteHoot hootId={hootId} /> }
                </section>
                <CommentFeed comments={hoot.comments} />
                <CommentCreate hootId={hootId} setHoot={setHoot} />
              </>
            ) 
            : <p>Nothing to display.</p>
      }
    </>
  )
}

export default HootDetails