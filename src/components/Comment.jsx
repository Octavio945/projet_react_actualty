import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="border-start ps-3 my-2">
      <p className="mb-1">{comment.content}</p>
      <small className="text-muted">Par utilisateur #{comment.UserId}</small>
    </div>
  );
};

export default Comment;
