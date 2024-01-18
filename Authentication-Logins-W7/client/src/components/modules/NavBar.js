import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import { get, post } from "../../utilities";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  // call whoami to set loggedin state 
  // using UseEffect for on refresh (first time rendering)
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) { // if user doesn't exist, user is empty JSON obj so can check any user's id for validity/existness
        setLoggedIn(true);
      }
    });
  }, []);


  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);
   
    

    // TODO: Send res.tokenObj.id_token to the backend
    post("/api/login", {token: res.tokenObj.id_token}).then((user) => {
      setLoggedIn(true);
      console.log(user);
    });
  
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setLoggedIn(false);

    // TODO: Tell the backend we logged out
    post("/api/logout");
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Catbook</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/profile/" className="NavBar-link">
          Profile
        </Link>
        {loggedIn ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
