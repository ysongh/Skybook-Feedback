import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import { Container, Input, Form, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';
import Spinner from '../components/loading/Spinner';
import TextEditor from '../components/TextEditor';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed(seedphase);
const dataKey = "localhost";
const dataDomain = window.location.hostname;

function CreateBook() {
  const { userID, mySky } = useContext(GlobalContext);
  const { state = {} } = useLocation();
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("Mybook");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(state.selectedBook){
      setTitle(state.selectedBook.title);
      setBody(state.selectedBook.body);
    }
  }, [])

  const setJSONtoMySky = async () => {
    try {
      setLoading(true);
      const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
      console.log(data, skylink);

      const bookData = {
        title,
        body,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        userID
      };

      let json;

      // edit mode
      if(id) {
        data.books[id].title = title;
        data.books[id].body = body;
        data.books[id].date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

        json = {
          books: data.books
        };
      }
      else {
        if(data === null) {
          json = {
            books: [bookData],
          };
        }
        else {
          data.books.push(bookData);
  
          json = {
            books: data.books,
          };
        }
      }

      // Set discoverable JSON data at the given path. The return type is the same as getJSON.
      const res = await mySky.setJSON((dataDomain + "/" + userID), json);
      console.log(res);

      history.push('/mybooks');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <br />
      <Form>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input style={{ flex: 1 }} value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <Button color='black' onClick={setJSONtoMySky}>
            Save
          </Button>
          <Button as={Link} to="/mybooks">
            Cancel
          </Button>
        </div>
        <TextEditor body={body} setBody={setBody} />
        {loading && <Spinner />}
      </Form>
    </Container>
  );
}

export default CreateBook;
