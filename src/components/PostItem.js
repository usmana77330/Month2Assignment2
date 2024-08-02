import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostItem.css';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <div className="post-info">
        <span>{post.likes} Likes</span>
        <Link to={`/posts/${post.id}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
};

export default PostItem;
