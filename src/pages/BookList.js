import React, { useContext, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed("sky book feed back");
const dataKey = "localhost";

function BookList() {
  const { userID, mySky } = useContext(GlobalContext);

  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  async function getJSONFromSkyDB() {
    try {
      const { data, skylink } = await client.db.getJSON(publicKey, dataKey);
      console.log(data, skylink);
    } catch (error) {
      console.log(error);
    }
  }

  async function setJSONFromSkyDB() {
    try {
      const json = {
        message: text
      };
      const { data, skylink } = await client.db.setJSON(privateKey, dataKey, json);
      console.log(data, skylink);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <p>userID: {userID}</p>
      <button onClick={getJSONFromSkyDB}>
        Get Data
      </button>
      <button onClick={setJSONFromSkyDB}>
        Set Data
      </button>
      <input onChange={(e) => setText(e.target.value)} value={text} placeholder="Enter text" />
      <p>{message}</p>
    </Container>
  );
}

export default BookList;
