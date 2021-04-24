import React from 'react';
import { useLocation } from 'react-router-dom'
import { Container, Card, Image } from 'semantic-ui-react';

function BookDetail() {
  const { state = {} } = useLocation();

  return (
    <Container>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Header>{state.selectedBook.title}</Card.Header>
            <Card.Meta><Image src="/" size='mini' avatar />{state.selectedBook.author}</Card.Meta>
            <Card.Description>
              {state.selectedBook.preview}
            </Card.Description>
            <br />
            <p>{state.selectedBook.body}</p>
          </Card.Content>
        </Card>
      </Card.Group>
      
    </Container>
  );
}

export default BookDetail;
