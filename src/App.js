import React, { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widget from "./components/Widget";
import "./App.css";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import FirstPage from "./components/FirstPage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        getDoc(doc(db, "userDetails", authUser.uid)).then((data) => {
          dispatch(
            login({
              email: authUser.email,
              uid: authUser.uid,
              displayName: authUser.displayName,
              description: data.data().description,
            })
          );
        });
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const user = useSelector(selectUser);
  return (
    <div className="App">
      {!user ? (
        <FirstPage />
      ) : (
        <div className="secondPage">
          <Header className="header" />
          <div className="main">
            <Sidebar className="sidebar" />
            <Feed />
            <Widget />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
