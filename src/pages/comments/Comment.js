import React from 'react'
import { Image, Media } from 'react-bootstrap'
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
                <Image src={profile_image} />
            </Link>
            <Media.Body>
                <span>{owner} </span>
                <span> {updated_at}</span>
                <p>{content}</p>
            </Media.Body>
        </Media>
    </div>
  )
}

export default Comment;