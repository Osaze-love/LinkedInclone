import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EventIcon from "@material-ui/icons/Event";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import CloseIcon from "@material-ui/icons/Close";
import "./Feed.css";
import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const photoRef = useRef();
  const videoRef = useRef();
  const user = useSelector(selectUser);
  const [image, setImage] = useState();
  const [mainview, setMainview] = useState();
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const colRef = collection(db, "posts");
  const q = query(colRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setMainview(null);
    }
  }, [image]);

  useEffect(() => {
    onSnapshot(q, colRef, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    console.log("I worked");
    addDoc(colRef, {
      Name: user.displayName,
      description: user.description,
      message: input,
      createdAt: serverTimestamp(),
      userId: user.uid,
      likes: [],
      comments: [],
      image: mainview,
      video: videoRef.current.value,
    });
    setInput("");
    setMainview("");
    videoRef.current.value = null;
  };
  return (
    <div className="feed">
      <div className="feedTop">
        <div className="feedInputSection">
          <div className="feedInputSectionAvatar">
            <Avatar
              style={{
                color: "black",
                backgroundColor: "white",
                fontWeight: "bold",
              }}
              className="Avatar"
            >
              {user.displayName.charAt(0)}
            </Avatar>
          </div>
          <form className="feedInputSectionForm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a post"
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="videoInput">
          <input ref={videoRef} type="text" placeholder="Add Video Url" />
        </div>
        {mainview ? (
          <div className="imageAddedDetails">
            <p
              style={{
                marginRight: 10,
              }}
            >
              Image Added
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
        ) : null}
        <div className="feedActivities">
          <div className="Activity1">
            <div
              className="ActivityOne"
              onClick={() => {
                photoRef.current.click();
              }}
            >
              <PhotoIcon className="photoIcon" />
              <p>Photo</p>
            </div>
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
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              videoRef.current.classList.toggle("active");
            }}
            className="Activity2"
          >
            <YouTubeIcon className="youtubeIcon" />
            <p>Video</p>
          </div>
          <div
            style={{
              color: "rgba(48, 47, 47, 1)",
            }}
            className="Activity3"
          >
            <EventIcon className="eventIcon" />
            <p>Event</p>
          </div>
          <div
            style={{
              color: "rgba(48, 47, 47, 1)",
            }}
            className="Activity4"
          >
            <CalendarViewDayIcon className="calendarIcon" />
            <p>Write Article</p>
          </div>
        </div>
      </div>

      <div className="feedMain">
        <FlipMove>
          {posts.map(
            ({
              id,
              data: {
                Name,
                description,
                message,
                userId,
                image,
                likes,
                comments,
                video,
              },
            }) => (
              <Post
                likes={likes}
                key={id}
                posts={posts}
                comments={comments}
                id={id}
                Name={Name}
                description={description}
                message={message}
                userId={userId}
                image={image}
                video={video}
              />
            )
          )}
        </FlipMove>
      </div>
    </div>
  );
}

export default Feed;
