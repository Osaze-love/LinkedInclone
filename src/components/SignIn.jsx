import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./SignIn.css";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginToApp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        getDoc(doc(db, "userDetails", authUser.user.uid)).then((data) => {
          dispatch(
            login({
              email: authUser.user.email,
              uid: authUser.user.uid,
              displayName: authUser.user.displayName,
              description: data.data().description,
            })
          );
        });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="SignIn">
      <div className="SignInImage">
        <Link to="/">
          <img src="./images/LinkedIn_Logo.svg.png" alt="" />
        </Link>
      </div>
      <div className="form">
        <h2>Sign In</h2>
        <p>Stay updated on your professional world</p>
        <div className="formInput">
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Email"
          />
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        <p className="forgot">Forgot Password?</p>
        <button onClick={loginToApp}>Sign In</button>
        <span>
          <p className="new">New to LinkedIn?</p>
          <Link to="/join">
            <p className="Join">Join now</p>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignIn;
