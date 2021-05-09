import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Image, Grid, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';

const dataDomain = window.location.hostname;

function Profile() {
  const { userID, mySky, contentRecord } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const getJSONfromMySky = async (userID) => {
      try {
        const { data, skylink } = await mySky.getJSON(dataDomain + "/profile" + userID);
        console.log(data, skylink);

        await contentRecord.recordInteraction({
          skylink,
          metadata: {"action": "See Profile"}
        });
        setName(data?.name || "");
        setBio(data?.bio || "");
      } catch (error) {
        console.log(error);
      }
    }

    getJSONfromMySky(userID);
  }, [userID])

  const updateProfileOnMySky = async () => {
    try {
      const json = {
        name: name,
        bio: bio
      }
      const { data, skylink } = await mySky.setJSON((dataDomain + "/profile" + userID), json);
      console.log(data, skylink);

      await contentRecord.recordInteraction({
        skylink,
        metadata: { "action": "update profile" }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="bodyHeight">
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h1'>Your Profile</Header>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image src='/images/defaultuser.png' size='medium' circular bordered />
          </Grid.Column>
          <Grid.Column width={10}>
            <p>User Id: {userID}</p>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Field>
              <Form.Field>
                <label>Bio</label>
                <input value={bio} onChange={(e) => setBio(e.target.value)} />
              </Form.Field>

              <Button
                type='submit'
                color="black"
                onClick={updateProfileOnMySky}
              >Update</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
      
    </Container>
  );
}

export default Profile;
