import React, { useEffect, useState } from 'react';
import { SkynetClient } from "skynet-js";

const portal = 'https://siasky.net/';   // allow for developing on localhost
const client = new SkynetClient(portal);
const hostApp = "host-app.hns";
const dataDomain = 'localhost';

function Home() {
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);
    
        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (e) {
        console.error(e);
      }
    }
    initMySky();
  }, [])

  const handleMySkyLogin = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  };
  
  const handleMySkyLogout = async () => {
    // call logout to globally logout of mysky
    await mySky.logout();

    setLoggedIn(false);
    setUserID('');
  };

  return (
    <div>
      <p>userID: {userID}</p>
      {/* <p>mySky: {mySky}</p> */}
      {loggedIn === true && (
        <button onClick={handleMySkyLogout}>
          Log Out of MySky
        </button>
      )}
      {loggedIn === false && (
        <button onClick={handleMySkyLogin}>
          Login with MySky
        </button>
      )}
    </div>
  );
}

export default Home;
