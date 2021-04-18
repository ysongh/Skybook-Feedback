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
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

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

  const getJSONExample = async () => {
    try {
      // Get discoverable JSON data from the given path.
      const { data, skylink } = await mySky.getJSON("app.hns/path/file.json");
      console.log(data, skylink);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const setJSONExample = async () => {
    try {
      // Set discoverable JSON data at the given path. The return type is the same as getJSON.
      const { data, skylink } = await mySky.setJSON("app.hns/path/file.json", { message: text });
      console.log(data, skylink);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p>userID: {userID}</p>
      {/* <p>mySky: {mySky}</p> */}
      {loggedIn === true && (
        <>
          <button onClick={handleMySkyLogout}>
            Log Out of MySky
          </button>
          <button onClick={getJSONExample}>
            Get Data
          </button>
          <button onClick={setJSONExample}>
            Set Data
          </button>
          <input onChange={(e) => setText(e.target.value)} value={text} placeholder="Enter text" />
        </>
      )}
      {loggedIn === false && (
        <button onClick={handleMySkyLogin}>
          Login with MySky
        </button>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Home;
