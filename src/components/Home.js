import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import PostList from './PostList';
import Filter from './Filter';
import '../styles/Home.css';

const Home = () => {
  const { posts, addPost, filterPosts } = useContext(PostContext);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [filter, setFilter] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newPost);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="home">
      <h1>Blogging Application</h1>
      <div className="add-post-form">
        <h2>Add a New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Add Post</button>
        </form>
      </div>
      <div className="filter">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <PostList filter={filterPosts(filter)} />
    </div>
  );
};

export default Home;
