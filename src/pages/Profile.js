import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Image, Grid, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';

const dataDomain = window.location.hostname;

function Profile() {
  const { userID, mySky, clientSkyDB, contentRecord } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

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
        setImageURL(data?.imageURL || "");
      } catch (error) {
        console.log(error);
      }
    }

    getJSONfromMySky(userID);
  }, [userID])

  const updateProfileOnMySky = async () => {
    try {
      setLoading(true);

      const json = {
        name: name,
        bio: bio,
        imageURL: imageURL
      }
      const { data, skylink } = await mySky.setJSON((dataDomain + "/profile" + userID), json);
      console.log(data, skylink);

      await contentRecord.recordInteraction({
        skylink,
        metadata: { "action": "update profile" }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const getFileAndUploadONSkyDB = async event => {
    try{
      const file = event.target.files[0];
      const { skylink } = await clientSkyDB.uploadFile(file);

      // skylinks start with `sia://` and don't specify a portal URL
      // generate URLs for our current portal though.
      const skylinkUrl = await clientSkyDB.getSkylinkUrl(skylink);
      setImageURL(skylinkUrl);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <Container className="bodyHeight">
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h1'>Your Profile</Header>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image src={imageURL ? imageURL : '/images/defaultuser.png'} size='medium' circular bordered />
            <input type="file" onChange={getFileAndUploadONSkyDB} />
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
              {loading && <Spinner label="Updating..." />}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
      
    </Container>
  );
}

export default Profile;
