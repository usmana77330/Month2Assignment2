import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import '../styles/PostDetail.css';
import Spinner from './Spinner'; 

const PostDetail = () => {
  const { postId } = useParams();
  const { posts, getPostById, likePost, addComment, deletePost, updatePost, loading } = useContext(PostContext);
  const post = getPostById(postId);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(post?.comments || []);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ title: '', content: '' });

  useEffect(() => {
    setCommentList(post?.comments || []);
    setUpdatedPost({ title: post?.title || '', content: post?.content || '' });
  }, [post]);

  if (loading) {
    return <Spinner />; //Loading Spinner Indicator
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  const handleLike = () => {
    likePost(post.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment(post.id, { text: comment, id: Date.now() });
    setComment('');
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePost(post.id, updatedPost);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost({ ...updatedPost, [name]: value });
  };

  return (
    <div className="post-detail">
      {isEditing ? (
        <div className="edit-form">
          <h2>Edit Post</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="title"
              value={updatedPost.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <textarea
              name="content"
              value={updatedPost.content}
              onChange={handleChange}
              placeholder="Content"
              required
            ></textarea>
            <button type="submit">Update Post</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="post-info">
            <span>{post.likes} Likes</span>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDelete} className="delete-button">Delete Post</button>
            <button onClick={handleEdit} className="edit-button">Edit Post</button>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            {commentList.map(c => (
              <div key={c.id} className="comment">
                <p>{c.text}</p>
              </div>
            ))}
            <form className="comment-form" onSubmit={handleAddComment}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
                required
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
