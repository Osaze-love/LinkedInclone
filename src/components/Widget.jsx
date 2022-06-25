import React from "react";
import "./Widget.css";
import { Avatar } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function Widget() {
  return (
    <div className="widget">
      <div className="widgetone">
        <div className="widgetonetop">
          <h4>Add to your Feed</h4>
          <InfoIcon className="infoIcon" />
        </div>
        <div className="widgetonemiddleone">
          <Avatar
            style={{
              color: "black",
              backgroundColor: "white",
              marginRight: 10,
            }}
            className="avatar"
          />
          <div className="widgetonemiddleonetext">
            <h4>Adeloba Loris</h4>
            <p className="building">
              Building the future of upcoming developers
            </p>
            <div
              style={{
                color: "rgba(48, 47, 47, 1)",
              }}
              className="widgetonemiddleonetextfollow"
            >
              <AddIcon />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="widgetonemiddleone">
          <Avatar
            style={{
              color: "black",
              backgroundColor: "white",
              marginRight: 10,
            }}
            className="avatar"
          />
          <div className="widgetonemiddleonetext">
            <h4>Adeloba Loris</h4>
            <p className="building">
              Building the future of upcoming developers
            </p>
            <div
              style={{
                color: "rgba(48, 47, 47, 1)",
              }}
              className="widgetonemiddleonetextfollow"
            >
              <AddIcon />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="widgetonemiddleone">
          <Avatar
            style={{
              color: "black",
              backgroundColor: "white",
              marginRight: 10,
            }}
            className="avatar"
          />
          <div className="widgetonemiddleonetext">
            <h4>Adeloba Loris</h4>
            <p className="building">
              Building the future of upcoming developers
            </p>
            <div
              style={{
                color: "rgba(48, 47, 47, 1)",
              }}
              className="widgetonemiddleonetextfollow"
            >
              <AddIcon />
              <p>Follow</p>
            </div>
          </div>
        </div>
        <div className="widgetonebottom">
          <p>View all recommendations</p>
          <ArrowRightAltIcon className="arrow" />
        </div>
      </div>
      <div className="widgettwo">
        <img src="./images/seehiring.png" alt="" />
      </div>
    </div>
  );
}

export default Widget;
