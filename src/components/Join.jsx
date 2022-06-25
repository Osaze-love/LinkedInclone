import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { login } from "../features/userSlice";
import { doc, collection, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const register = (e) => {
    if (!name) {
      return alert("Please enter a full name");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: name,
        })
          .then(() => {
            setDoc(doc(db, "userDetails", authUser.user.uid), {
              description: description,
            });
          })
          .then(() => {
            dispatch(
              login({
                email: authUser.user.email,
                uid: authUser.user.uid,
                displayName: name,
                description: description,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="join">
      <div className="joinImage">
        <Link to="/">
          <img src="./images/LinkedIn_Logo.svg.png" alt="" />
        </Link>
      </div>
      <p className="themost">Make the most of your professional life</p>
      <div className="form">
        <div className="input1">
          <label hTMLFor="name">Name</label>
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            type="text"
          />
        </div>
        <div className="input2">
          <label htmlFor="email">Email</label>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            type="text"
          />
        </div>
        <div className="input3">
          <label htmlFor="password">Password</label>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            type="password"
          />
        </div>
        <div className="input4">
          <label htmlFor="jobdescription">Job Description</label>
          <input
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="jobdescription"
            type="text"
          />
        </div>

        <button onClick={register}>Join</button>
        <span>
          <p className="already">Already on LinkedIn? </p>
          <Link to="/signIn">
            <p className="signIn">Sign In</p>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Join;
