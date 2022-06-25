import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationIcon from "@material-ui/icons/Notifications";
import { auth } from "../firebase";
import { logout } from "../features/userSlice";
import { signOut } from "firebase/auth";

function Header() {
  const dispatch = useDispatch();
  const signOutToMain = () => {
    dispatch(logout());
    signOut(auth);
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <img src="images/linkedinlogo.png" alt="" />
        <div className="headerLeftSearch">
          <div className="headerLeftSearchContents">
            <SearchIcon className="searchIcon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="headerRight">
        <div
          style={{
            color: "rgba(48, 47, 47, 1)",
          }}
          className="headerRightContent thehome"
        >
          <HomeIcon className="homeIcon " />
          <h3>Home</h3>
        </div>
        <div
          style={{
            color: "rgba(48, 47, 47, 1)",
          }}
          className="headerRightContent thesupervisor"
        >
          <SupervisorAccountIcon className="supervisorIcon" />
          <h3>My Account</h3>
        </div>
        <div
          style={{
            color: "rgba(48, 47, 47, 1)",
          }}
          className="headerRightContent thejobs"
        >
          <BusinessCenterIcon className="businessIcon" />
          <h3>Jobs</h3>
        </div>
        <div
          style={{
            color: "rgba(48, 47, 47, 1)",
          }}
          className="headerRightContent thechat"
        >
          <ChatIcon className="chatIcon" />
          <h3>Messaging</h3>
        </div>
        <div
          style={{
            color: "rgba(48, 47, 47, 1)",
          }}
          className="headerRightContent thebell"
        >
          <NotificationIcon className="notificationIcon" />
          <h3>Notifications</h3>
        </div>
        <div className="headerRightContent">
          <button onClick={signOutToMain}>SignOut</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
