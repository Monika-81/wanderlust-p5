import React, { useState } from 'react'
import { Image, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults';
import { DotDropdown } from '../../components/DotDropdown';
import { useCurrentUser } from '../../context/CurrentUserContext';
import EditComment from './EditComment';
import styles from "../../styles/Comment.module.css";

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
  const [ showEditComment, setShowEditComment] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this comment?")){
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
  }

  return (
    <div className={styles.Comment}>
        <Media>
            <Link to={`/profiles/${profile_id}`}>
                <Image src={profile_image} height={60} width={60} roundedCircle />
            </Link>
            <Media.Body>
                <span>{owner} </span>
                <span> {updated_at}</span>
                {showEditComment ? (
                  <EditComment 
                    id={id}
                    content={content}
                    profile_id={profile_id}
                    profile_image={profile_image}
                    setComments={setComments}
                    setShowEditComment={setShowEditComment}  
                  />
                ) : (
                  <p>{content}</p>
                )}
            </Media.Body>
            {is_owner && !showEditComment && (
              <DotDropdown
                handleEdit={() => setShowEditComment(true)}
                handleDelete={handleDelete}
              />
            )}
        </Media>
    </div>
  )
}

export default Comment;