import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Mynasubi from "../assets/img/mynasubi.jpeg";
import Userprofile from "../assets/img/user-profile.png";

const Chat = (props) => {
  const isQuestion = props.type === "question";
  const classes = isQuestion ? "p-chat" : "p-chat__reverse";

  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        {isQuestion ? (
          <Avatar alt="icon" src={Mynasubi} />
        ) : (
          <Avatar alt="icon" src={Userprofile} />
        )}
      </ListItemAvatar>
      <div className="p-chat__bubble">{props.text}</div>
    </ListItem>
  );
};

export default Chat;
