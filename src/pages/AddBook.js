import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey } = genKeyPairFromSeed("sky book feed back");
const dataKey = "localhost";

function AddBook() {
  const { userID, mySky } = useContext(GlobalContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState("");
  const [body, setBody] = useState("");

  async function addBookToSkyDB() {
    try {
      const bookData = {
        title,
        author,
        preview,
        body,
        userID
      }

      const json = {
        books: bookData
      };
      const { data, skylink } = await client.db.setJSON(privateKey, dataKey, json);
      console.log(data, skylink);
      history.push('/booklist');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Card centered style={{ minWidth: '500px'}}>
        <Card.Content>
          <Card.Header style={{ textAlign: 'center', marginBottom: '10px'}}>Add Book</Card.Header>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input fluid value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input fluid value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Preview</label>
              <input fluid value={preview} onChange={(e) => setPreview(e.target.value)} />
            </Form.Field>
            <Form.TextArea label='About' value={body} onChange={(e) => setBody(e.target.value)} />
            <Button type='submit' onClick={addBookToSkyDB}>Submit</Button>
          </Form>
        </Card.Content>
      </Card>
      
    </Container>
  );
}

export default AddBook;
