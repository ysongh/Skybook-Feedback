import React, { useContext, useState } from 'react';
import { Container, Header, Image, Grid, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';

function Profile() {
  const { userID } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

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
              >Change</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
      
    </Container>
  );
}

export default Profile;
