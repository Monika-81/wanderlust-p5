import React from 'react'
import { Image, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults';
import { DotDropdown } from '../../components/DotDropdown';
import { useCurrentUser } from '../../context/CurrentUserContext';

const Comment = (props) => {
  const {
    id,
    owner,
    content,
    profile_id,
    profile_image,
    updated_at,
    setPost, 
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;


  const handleDelete = async () => {
    try {
        await axiosRes.delete(`/comments/${id}/`);
        setPost((prevpost) => ({
          results: [
            {
              ...prevpost.results[0],
              comments_count: prevpost.results[0].comments_count -1
            },
          ],
        }));
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
    } catch (err) {
        console.log(err)
    }
}

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
            {is_owner (
              <DotDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
        </Media>
    </div>
  )
}

export default Comment;