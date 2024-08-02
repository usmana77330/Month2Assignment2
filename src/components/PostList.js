import React, { useContext } from 'react';
import PostItem from './PostItem';
import { PostContext } from '../context/PostContext';
import '../styles/PostList.css';
import Spinner from './Spinner';

const PostList = ({ filter }) => {
  const { loading } = useContext(PostContext);

  return (
    <div className="post-list">
      {loading ? (
        <Spinner /> // Loading Indicator
      ) : filter.length > 0 ? (
        filter.map(post => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
