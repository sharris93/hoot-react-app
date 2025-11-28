import './CommentFeed.css'

const CommentFeed = ({ comments }) => {
  return (
    <section className='comment-feed-section'>
      { comments.length > 0
        ? comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <p>
              {`${comment.author.username} posted on
              ${new Date(comment.createdAt).toLocaleDateString()}`}
            </p>
          </div>
        ))
        : <p>There are no comments yet. Be the first to leave one!</p>
      }
    </section>
  )
}

export default CommentFeed