import './HootIndex.css'
import { useEffect, useState } from 'react'
import { hootIndex } from '../../services/hoots'

import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { Link } from 'react-router'

const HootIndex = () => {
  const [hoots, setHoots] = useState([])
  const [errorData, setErrorData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await hootIndex()
        setHoots(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response.data)
      } finally {
        setTimeout(() => setIsLoading(false), 1000)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1>All Hoots</h1>
      { errorData.message
        ? <p className='error-message'>{errorData.message}</p>
        : isLoading
          ? <LoadingIcon />
          : hoots.map(hoot => {
              return (
                <div key={hoot._id} className='hoot-card'>
                  <Link to={`/hoots/${hoot._id}`}>
                    <h2>{hoot.title}</h2>
                    <p>{hoot.text.substring(0, 20)}...</p>
                  </Link>
                </div>
              )
            })
      }
    </>
  )
}

export default HootIndex