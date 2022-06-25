import React, { useState } from "react";
import "./Like.css";
import AvatarGroup from "@mui/material/AvatarGroup";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Avatar from "@mui/material/Avatar";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Like({ id, likes }) {
  const user = useSelector(selectUser);
  const LikeItem = () => {
    const docRef = doc(db, "posts", id);
    if (likes.includes(user.displayName)) {
      updateDoc(docRef, {
        likes: arrayRemove(user.displayName),
      });
    } else {
      updateDoc(docRef, {
        likes: arrayUnion(user.displayName),
      });
    }
  };

  // console.log(likes[0]);

  return (
    <div className="likesection">
      {likes[0] ? (
        <div className="likeCount">
          <p>Likes</p>
          <AvatarGroup>
            {likes[0] && (
              <Avatar
                sx={{
                  fontSize: 14,
                  color: "black",
                  width: 17,
                  height: 17,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                {likes[0].charAt(0).toUpperCase()}
              </Avatar>
            )}
            {likes[1] && (
              <Avatar
                sx={{
                  fontSize: 14,
                  color: "black",
                  width: 17,
                  height: 17,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                {likes[1].charAt(0).toUpperCase()}
              </Avatar>
            )}
            {likes[2] && (
              <Avatar
                sx={{
                  fontSize: 14,
                  color: "black",
                  width: 17,
                  height: 17,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                {likes[2].charAt(0).toUpperCase()}
              </Avatar>
            )}
            {likes[3] && (
              <Avatar
                sx={{
                  fontSize: 14,
                  color: "black",
                  width: 17,
                  height: 17,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                {likes[3].charAt(0).toUpperCase()}
              </Avatar>
            )}
            {likes[4] && (
              <Avatar
                sx={{
                  fontSize: 14,
                  color: "black",
                  width: 17,
                  height: 17,
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                {likes[4].charAt(0).toUpperCase()}
              </Avatar>
            )}
          </AvatarGroup>
        </div>
      ) : null}

      <div onClick={LikeItem} className="like">
        {likes[0] ? (
          <ThumbUpIcon
            className="thumbIcon"
            style={{
              transition: "0.3 ease-in-out",
              color: "#0a66c2",
            }}
          />
        ) : (
          <ThumbUpIcon
            style={{
              transition: "0.3s ease-in-out",
            }}
            className="thumbIcon"
          />
        )}
        <p>Like</p>
      </div>
    </div>
  );
}

export default Like;
