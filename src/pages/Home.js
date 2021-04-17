import React, { useEffect } from 'react';
import { SkynetClient } from "skynet-js";

const client = new SkynetClient("https://siasky.net");
const hostApp = "host-app.hns";

function Home() {
  useEffect(() => {
    async function mySkyExample() {
      try {
        // Initialize MySky.
        const mySky = await client.loadMySky(hostApp);
        console.log(mySky)
      } catch (error) {
        console.log(error)
      }
    }
    mySkyExample();
  }, [])
  
  async function checkLoginExample() {
    try {
      const mySky = await client.loadMySky(hostApp);
  
      // Try to login silently, requesting permissions for host-app.hns.
      const loggedIn = await mySky.checkLogin();
      console.log(loggedIn)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={checkLoginExample}>Check Login</button>
    </div>
  );
}

export default Home;
