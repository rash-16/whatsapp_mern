import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton, Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://media-exp1.licdn.com/dms/image/C5603AQFBIkSbuS5wwA/profile-displayphoto-shrink_800_800/0/1614835172714?e=1625097600&v=beta&t=MGnwzPCWIIJPIePs53-OqT4oVJR8ifqczmwgSZxKdmk" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start a newchat" type="text"></input>
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />

      </div>
    </div>
  );
}

export default Sidebar;
