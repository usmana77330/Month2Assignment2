import React, { createContext, useState } from 'react';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addPost = async (post) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts([...posts, { ...post, id: Date.now(), likes: 0, comments: [] }]);
    setLoading(false);
  };

  const getPostById = (id) => posts.find(post => post.id === parseInt(id));

  const filterPosts = (keyword) => {
    return posts.filter(post => post.title.includes(keyword) || post.content.includes(keyword));
  };

  const likePost = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
    setLoading(false);
  };

  const addComment = async (id, comment) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    ));
    setLoading(false);
  };

  const deletePost = async (id) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(posts.filter(post => post.id !== id));
    setLoading(false);
  };

  const updatePost = async (id, updatedPost) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPosts(posts.map(post =>
      post.id === id ? { ...post, ...updatedPost } : post
    ));
    setLoading(false);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, getPostById, filterPosts, likePost, addComment, deletePost, updatePost, loading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
