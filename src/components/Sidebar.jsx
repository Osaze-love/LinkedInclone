import React from "react";
import { Avatar } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FolderIcon from "@material-ui/icons/Folder";
import "./Sidebar.css";
import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);

  return (
    <div className="sideBar">
      <div className="sideBarOne">
        <div className="sideBarMain">
          <img src="./images/sidebarimage.jpg" alt="" />
          <Avatar
            style={{
              color: "black",
              backgroundColor: "white",
              fontWeight: "bold",
            }}
            className="avatar"
          >
            {user.displayName.charAt(0)}
          </Avatar>
          <h3>{user.displayName}</h3>
          <p>{user.description}</p>
        </div>
        <div className="sideBarSub">
          <div className="sideBarSubOne">
            <p className="p1">Connections</p>
            <p>Grow Your Network</p>
          </div>
          <div className="sideBarSubTwo">
            <p className="p2">0</p>
          </div>
        </div>
        <div className="sideBarSub2">
          <p className="p1">Access exclusive tools and insights</p>
          <span>
            <FolderIcon className="folder" />
            <p>Try Premium for free</p>
          </span>
        </div>

        <div className="sideBarSub3">
          <BookmarkIcon />
          <p>My Items</p>
        </div>
      </div>
      <div className="sideBarTwo">
        <div className="sideBarTwo1">
          <p>Recent</p>
          <span>
            <PeopleIcon className="peopleIcon" />
            <p> No Recent Activity </p>
          </span>
        </div>
        <div className="sideBarTwo2">
          <p className="groupText">Groups</p>
          <span>
            <BusinessIcon className="businessIcon" />
            <p> No Group joined </p>
          </span>
        </div>

        <div className="sideBarTwo3">
          <p>Events</p>
          <AddIcon />
        </div>
        <div className="sideBarTwo4">
          <p>Followed Hashtags</p>
        </div>
        <div className="sideBarTwo5">
          <p>Discover More</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
