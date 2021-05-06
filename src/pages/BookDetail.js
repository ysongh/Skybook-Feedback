import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { Grid, Container, Card, Image, Form, Header, Comment, Button, Label } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';

function BookDetail() {
  const { userID, contentRecord, privateKey, publicKey, clientSkyDB } = useContext(GlobalContext);
  const { id } = useParams();
  const { state = {} } = useLocation();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCommentsFromSkyDB() {
      try {
        const { data, skylink } = await clientSkyDB.db.getJSON(publicKey, "comments");
        console.log(data, skylink);

        if (userID) {
          await contentRecord.recordInteraction({
            skylink,
            metadata: {"action": "view comments"}
          });
        }
        
        setComments(data.comments);
      } catch (error) {
        console.log(error);
      }
    }

    getCommentsFromSkyDB();
  }, [])


  async function addComment() {
    try {
      setLoading(true);
      let { data, skylink } = await clientSkyDB.db.getJSON(publicKey, "comments");
      console.log(data, skylink);

      const commentData = {
        bookId: id,
        comment,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        userID
      }

      // for front end
      let _comments = comments;
      _comments.push(commentData);

      // for SkyDB
      let json;
      if (!data) {
        json = {
          comments: [commentData]
        };
      }
      else {
        data.comments.push(commentData);
        json = {
          comments: data.comments
        };
      }

      const res = await clientSkyDB.db.setJSON(privateKey, "comments", json);

      await contentRecord.recordNewContent({
        skylink: res.skylink,
        metadata: res.data
      });

      setLoading(false);
      setComments(_comments);
      setComment("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Container className="bodyHeight">
      <br />

      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={10}>
          <Card.Group>
            <Card fluid>
              <Card.Content>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <Card.Header style={{ fontSize: '1.75rem' }}>{state.selectedBook.title}</Card.Header>
                  <Card.Meta>{state.selectedBook.date}</Card.Meta>
                </div>
                <Card.Description>
                  {state.selectedBook.preview}
                </Card.Description>
                <br />
                <ReactQuill className="hideToolbar" theme="snow" value={state.selectedBook.body} readOnly/>
                <br />
                <Label as='a' image>
                  <img src='/images/defaultuser.png' />
                  {state.selectedBook.author}
                </Label>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={6}>
          <Header as='h3' dividing>
            Comments
          </Header>

          {userID && <Form reply style={{marginBottom: '2rem'}}>
            <Form.TextArea value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Button disabled={!comment} content='Add Comment' labelPosition='left' icon='edit' color='black' onClick={addComment} />
            {loading && <Spinner />}
          </Form> }

          {comments.map((comment, index) => {
            if (comment.bookId === id) {
              return (
                <Comment style={{marginBottom: '1rem'}} key={index}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image size='mini' avatar src="/images/defaultuser.png" />
                    <Comment.Author as='a'>{comment.userID.substring(0,15)}...{comment.userID.substring(49,64)}</Comment.Author>
                  </div>
                  <Comment.Content>
                    <Comment.Metadata>
                      <div>{comment.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            }
          })}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default BookDetail;
