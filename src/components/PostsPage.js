// PostsPage.js
import React from 'react';

const PostsPage = () => {
  // In a real-world scenario, you would fetch posts from an API here.

  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
  ];

  return (
    <div>
      <h2>Posts Page</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
