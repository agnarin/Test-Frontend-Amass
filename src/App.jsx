import React, { useState, useEffect } from 'react';
import './Home.css'; 
import catAndDogImage from './assets/CatandDog.png'; 

const API_URL = ' http://localhost:5123/api/comments';

const CommentApp = () => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    
    const fetchComments = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched comments:", data);
        setComments(data); 
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []); 

  
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const commentText = newComment.trim();

      if (commentText) {
        
        const newCommentObject = {
          user: 'Blend 285', 
          text: commentText,
        };

        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentObject),
          });

          if (!response.ok) {
            throw new Error('Error saving comment');
          }

          
          const savedComment = await response.json();

          
          setComments([...comments, savedComment]);
          setNewComment(''); 

        } catch (error) {
          console.error("Error posting comment:", error);
        }
      }
    }
  };

  
  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  
  return (
    <div className="container">
      <header className="header">
       Test Example 
      </header>
      
      <main className="main-content">
        <section className="post-section">
          <div className="post-header">
            <div className="avatar avatar-c">AK</div>
            <div>
              <div className="user-name">Agnarin Kamsaeng</div>
              <div className="timestamp">16 Nov 2025 10:00</div>
            </div>
          </div>
          <img 
            src={catAndDogImage} 
            alt="Dog and cat on grass" 
            className="post-image" 
          />
        </section>

        <section className="comment-section">
          <div className="comment-row">
            <div className="avatar avatar-b">B</div>
            <input
              type="text"
              placeholder="Comment"
              className="comment-input"
              value={newComment}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          
          {comments.map((comment) => (
            <div key={comment.id} className="comment-row">
              <div className="avatar avatar-b">B</div>
              <div className="comment-content">
                <span className="user-name">{comment.user}</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CommentApp;