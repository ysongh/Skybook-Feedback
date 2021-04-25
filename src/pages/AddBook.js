import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed("sky book feed back");
const dataKey = "localhost";

function AddBook() {
  const { userID, mySky } = useContext(GlobalContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function addBookToSkyDB() {
    try {
      setLoading(true);
      let { data, skylink } = await client.db.getJSON(publicKey, dataKey);
      console.log(data, skylink);

      const bookData = {
        title,
        author,
        preview,
        body,
        date: new Date().toLocaleDateString(),
        userID
      };

      data.books.push(bookData);

      const json = {
        books: data.books,
        comments: data.comments
      };
      
      await client.db.setJSON(privateKey, dataKey, json);
      
      history.push('/booklist');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <br />
      <Card centered style={{ minWidth: '500px'}}>
        <Card.Content>
          <Card.Header style={{ textAlign: 'center', marginBottom: '10px'}}>Add Book</Card.Header>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Preview</label>
              <input value={preview} onChange={(e) => setPreview(e.target.value)} />
            </Form.Field>
            <Form.TextArea label='Body' rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
            <Button type='submit' color="black" onClick={addBookToSkyDB}>Submit</Button>
            
            {loading && <Spinner />}
          </Form>
        </Card.Content>
      </Card>
      
    </Container>
  );
}

export default AddBook;
