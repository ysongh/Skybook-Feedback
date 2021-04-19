import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SkynetClient } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';

const portal = 'https://siasky.net/';   // allow for developing on localhost
const client = new SkynetClient(portal);
const hostApp = "host-app.hns";
const dataDomain = 'localhost';

function Home() {
  const { mySky, setUserID, setMySky } = useContext(GlobalContext);
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const _mySky = await client.loadMySky(dataDomain);
        // check if user is already logged in with permissions
        const loggedIn = await _mySky.checkLogin();

        setMySky(_mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await _mySky.userID());
          history.push('/booklist');
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
      history.push('/booklist');
    }
  };

  return (
    <div>
      <h1>Skybook Feedback</h1>
      <button onClick={handleMySkyLogin}>
        Login with MySky
      </button>
    </div>
  );
}

export default Home;
