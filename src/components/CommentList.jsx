import React from "react";
import { ListGroup } from "react-bootstrap";

const CommentList = (props) => {
  const comments = props.comments;
  if (!comments.length) {
    return <div>No Comments here!</div>;
  } else {
    return (
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item>
            <div className='d-flex flex-column'>
              <span>{comment.user}</span>
              <span>{comment.text}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
};

export default CommentList;
