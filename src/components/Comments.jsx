import React, { useRef } from "react";
import { Avatar } from "@material-ui/core";
import "./Comments.css";
import { arrayRemove, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Comments({ commentText, description, displayName, id, postId }) {
  const user = useSelector(selectUser);

  const deleteComment = (e) => {
    const currentComment =
      e.target.parentElement.parentElement.parentElement.nextElementSibling
        .textContent;
    console.log(currentComment);

    const userInfo = {
      displayName: user.displayName,
      description: user.description,
      id: user.uid,
      postId: postId,
      commentText: currentComment,
    };
    console.log(userInfo);
    const docRef = doc(db, "posts", postId);

    updateDoc(docRef, {
      comments: arrayRemove(userInfo),
    });
  };
  console.log();
  return (
    <div className="commentsection">
      <Avatar
        style={{
          color: "black",
          backgroundColor: "white",
          marginRight: 10,
          fontWeight: "bold",
        }}
      >
        {displayName.charAt(0)}
      </Avatar>
      <div className="commentsectionDetails">
        <div className="commentsectionDetailsTop">
          <span>
            <h4>{displayName}</h4>
            <DeleteOutlineIcon onClick={deleteComment} />
          </span>
          <p>{description}</p>
        </div>
        <p>{commentText}</p>
      </div>
    </div>
  );
}

export default Comments;
