import React from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";

/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
const CommentsBlock = (props) => {

  let commentsList = null;
    const hasComments = props.comments.length !== 0;
    if (hasComments) {
      commentsList = props.comments.map((commentObj) => (
        <SingleComment
          _id={commentObj._id}
          creator_name={commentObj.creator_name}
          content={commentObj.content}
        />
      ));
    } else {
      commentsList = <div>No comments!</div>;
    }
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {commentsList}
        
        {/* TODO (step10): pass addNewComment as prop to NewComment */}
      </div>
      <NewComment storyId={props.storyId} addNewComment={props.addNewComment} />
    </div>
  );
};

export default CommentsBlock;
