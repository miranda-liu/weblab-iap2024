import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Chatbook = (props) => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  /**
   * @typedef MessageObject
   * @property {UserObject} sender
   * @property {string} content
   */
  /**
   * @typedef ChatData
   * @property {MessageObject[]} messages
   * @property {UserObject} recipient
   */

  const [activeUsers, setActiveUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  useEffect(() => {
    loadMessageHistory(ALL_CHAT);
  }, []);

  useEffect(() => {
    // get request to activeUsers
    get("/api/activeUsers").then((data) => {
      setActiveUsers([ALL_CHAT].concat(data.activeUsers));
    });
  }, []);

  useEffect(() => {
    const addMessages = (data) => {
      // only display messages that belong to currently active chat

      if (
        // if in all chat or in the chat and senders/recipients match
        (data.recipient._id === activeChat.recipient._id && data.sender._id === props.userId) ||
        (data.sender._id === activeChat.recipient._id && data.recipient._id === props.userId) ||
        (data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT")
      ) {
        setActiveChat((prevActiveChat) => ({
          recipient: prevActiveChat.recipient,
          messages: prevActiveChat.messages.concat(data),
        }));
      }
    };

    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, [activeChat.recipient._id, props.userId]);

  // socket.on call when component created that listens for the "activeUsers" event
  // when you hear the event, update state w new active user who just joined
  useEffect(() => {
    const updateActiveUsers = (data) => {
      setActiveUsers([ALL_CHAT].concat(data.activeUsers));
    };
    socket.on("activeUsers", updateActiveUsers);
    return () => {
      socket.off("activeUsers", updateActiveUsers);
    };
  }, []);

  const setActiveUser = (user) => {
    console.log(`setting active user to ${user.name}`);
    if (user === activeChat.recipient) {
      return; // do nothing if user alr active
    } else {
      setActiveChat({
        recipient: user,
        messages: [],
      });
    }

    loadMessageHistory(user);
  };

  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          {/* TODO (step 3.1): Add ChatList component and pass in the props:
                   users, active, userId, and setActiveUser.
                   These four props are described in ChatList.js  */}
          <ChatList
            users={activeUsers}
            active={activeChat.recipient}
            userId={props.userId}
            setActiveUser={setActiveUser}
          />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};

export default Chatbook;
