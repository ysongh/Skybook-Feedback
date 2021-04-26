import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Card, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';

const portal = 'https://siasky.net/';
const dataDomain = 'localhost';

function MyBooks() {
  const { userID, mySky } = useContext(GlobalContext);

  useEffect(() => {
    const getJSONfromMySky = async (userID) => {
      try {
        // Get discoverable JSON data from the given path.
        const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
        console.log(data, skylink);
      } catch (error) {
        console.log(error);
      }
    }

    getJSONfromMySky(userID);
  }, [userID])

  const setJSONtoMySky = async () => {
    try {
      // Set discoverable JSON data at the given path. The return type is the same as getJSON.
      const { data, skylink } = await mySky.setJSON((dataDomain + "/" + userID), { message: "test123" });
      console.log(data, skylink);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h4'>User Id: {userID}</Header>
      <button onClick={setJSONtoMySky}>
        Set Data
      </button>
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>The book</Card.Header>
            <Card.Meta>4/25/21</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Open
              </Button>
              <Button basic color='red'>
                Publish
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>The book</Card.Header>
            <Card.Meta>4/25/21</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Open
              </Button>
              <Button basic color='red'>
                Publish
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
}

export default MyBooks;
