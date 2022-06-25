import React, { forwardRef, useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Post.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  arrayUnion,
  arrayRemove,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Comments from "./Comments";
import Like from "./Like";
import ReactPlayer from "react-player";

const Post = forwardRef(
  (
    {
      posts,
      comments,
      userId,
      id,
      Name,
      description,
      message,
      likes,
      image,
      video,
    },
    ref
  ) => {
    const user = useSelector(selectUser);
    const [input, setInput] = useState(message);
    const [newimage, setNewImage] = useState();
    const [mainview, setMainview] = useState();
    const [newvideo, setNewVideo] = useState(video);
    const [value, setValue] = useState("");
    const commentRef = useRef(null);
    const formRef = useRef(null);
    const photoRef = useRef();

    useEffect(() => {
      if (newimage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMainview(reader.result);
        };
        reader.readAsDataURL(newimage);
      } else {
        setMainview(null);
      }
    }, [newimage]);

    const showMore = (e) => {
      const target = e.target.parentElement;
      target.classList.toggle("active");
    };

    const deletePost = () => {
      const docRef = doc(db, "posts", id);
      deleteDoc(docRef);
    };

    const sendEdit = (e) => {
      e.preventDefault();
      const docRef = doc(db, "posts", id);
      updateDoc(docRef, {
        message: input,
        video: newvideo,
        image: mainview,
      });
      setMainview(null);
      formRef.current.classList.value = null;
    };
    const toggleComment = () => {
      commentRef.current.classList.toggle("active");
    };

    const editPost = (e) => {
      const formReference = formRef.current.classList.toggle("active");
      return formReference;
    };

    const sendComment = (e) => {
      e.preventDefault();
      const userInfo = {
        displayName: user.displayName,
        description: user.description,
        id: user.uid,
        commentText: value,
        postId: id,
      };
      const docRef = doc(db, "posts", id);
      updateDoc(docRef, {
        comments: arrayUnion(userInfo),
      });
      setValue("");
    };

    return (
      <div ref={ref} className="Post">
        <div className="PostTop">
          <Avatar
            style={{
              color: "black",
              backgroundColor: "white",
              fontWeight: "bold",
            }}
            className="Avatar"
          >
            {Name[0]}
          </Avatar>
          <div className="postTopWriteup">
            <span>
              <h3>{Name}</h3>
              {userId === user.uid && (
                <div className="morecontents">
                  <MoreHorizIcon onClick={showMore} className="moreIcon" />
                  <div className="morecontentfeatures">
                    <span className="spanOption" onClick={deletePost}>
                      <DeleteIcon />
                      Delete
                    </span>
                    <span className="spanOption" onClick={editPost}>
                      <EditIcon />
                      Edit
                    </span>
                  </div>
                </div>
              )}
            </span>
            <p>{description}</p>
            <p>1d</p>
          </div>
        </div>
        <div className="PostMessage">
          <p>{message}</p>
          {video && (
            <div className="reactPlayer">
              <ReactPlayer
                className="player"
                controls
                width="100%"
                height="100%"
                style={{
                  position: "relative",
                }}
                url={video}
              />
            </div>
          )}

          {image && (
            <div className="PostMessageImage">
              <img src={image} alt="" />
            </div>
          )}
          <form ref={formRef} action="">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
            />
            {video && (
              <input
                value={newvideo}
                onChange={(e) => {
                  setNewVideo(e.target.value);
                }}
                type="text"
              />
            )}
            {image && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  photoRef.current.click();
                }}
              >
                <p>Choose Another Photo</p>
              </button>
            )}
            {mainview && (
              <div className="ImageChangedEdit">
                <p
                  style={{
                    marginRight: 10,
                  }}
                >
                  {" "}
                  Image Changed
                </p>
                <CloseIcon
                  onClick={() => {
                    setMainview(null);
                  }}
                  style={{
                    cursor: "pointer",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: "#1d1e1f",
                  }}
                />
              </div>
            )}
            <input
              ref={photoRef}
              type="file"
              style={{
                display: "none",
              }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewImage(file);
                } else {
                  setNewImage(null);
                }
              }}
            />
            <button onClick={sendEdit} className="postButton">
              Send Edit
            </button>
          </form>
        </div>
        <div className="PostButtons">
          <div className="PostButton1">
            {/* <ThumbUpIcon className="icon" />
          <p>Like</p> */}
            <Like likes={likes} id={id} />
          </div>
          <div onClick={toggleComment} className="PostButton2">
            <CommentIcon className="icon" />
            <p>Comment</p>
          </div>
          <div
            style={{
              color: "rgba(48, 47, 47, 1)",
            }}
            className="PostButton3"
          >
            <ShareIcon className="icon" />
            <p>Share</p>
          </div>
          <div
            style={{
              color: "rgba(48, 47, 47, 1)",
            }}
            className="PostButton4"
          >
            <SendIcon className="icon" />
            <p>Send</p>
          </div>
        </div>

        <div ref={commentRef} className="comment">
          <div className="commentTop">
            <Avatar
              style={{
                color: "black",
                backgroundColor: "white",
                marginRight: 10,
                fontWeight: "bold",
              }}
            >
              {" "}
              {user.displayName.charAt(0)}{" "}
            </Avatar>
            <form action="">
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                type="text"
              />
              <button onClick={sendComment}>Comment</button>
            </form>
          </div>
          {comments && (
            <div className="commentBottom">
              {comments.map(
                ({ commentText, description, displayName, id, postId }) => (
                  <Comments
                    postId={postId}
                    commentText={commentText}
                    description={description}
                    displayName={displayName}
                    id={id}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Post;
