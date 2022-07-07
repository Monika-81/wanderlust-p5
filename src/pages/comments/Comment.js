import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Comment = (props) => {
  const {
    owner,
    content,
    profile_id,
    profile_image,
    updated_at,
  } = props;

  return (
    <div>
        <hr />
        <Media>
            <Link to={`/profiles/${profile_id}`}>
                {profile_image}
            </Link>
            <Media.Body className='align-self-center ml-2'>
                <span>{owner}</span>
                <span>{updated_at}</span>
                <p>{content}</p>
            </Media.Body>
        </Media>
    </div>
  )
}

export default Comment;