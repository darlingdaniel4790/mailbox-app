import React, { useState } from "react";

const Context = React.createContext({
  loggedIn: "",
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
  messages: [],
  setMessages: () => {},
  unread: 0,
  setUnread: () => {},
});

export const ContextProvider = (props) => {
  // states here
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [messages, setMessages] = useState();
  const [unread, setUnread] = useState();

  // functions here

  return (
    <Context.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        user: user,
        setUser: setUser,
        messages: messages,
        setMessages: setMessages,
        unread: unread,
        setUnread: setUnread,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
