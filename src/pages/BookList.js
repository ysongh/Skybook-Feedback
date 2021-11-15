import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Button, Label, Pagination, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import CardListLoading from '../components/loading/CardListLoading';

const TOTALPAGE = 4;

function BookList() {
  const { userID, contentRecord, publicKey, clientSkyDB } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [currentSet, setCurrentSet] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getJSONFromSkyDB() {
      try {
        setLoading(true);
        const { data, skylink } = await clientSkyDB.db.getJSON(publicKey, "books");
        console.log(data, skylink);

        // if(userID){
        //   await contentRecord.recordInteraction({
        //     skylink,
        //     metadata: {"action": "view books"}
        //   });
        // }
        
        setBooks(data.books);
        setCurrentSet(data.books.slice(0, TOTALPAGE));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getJSONFromSkyDB();
  }, [])

  const changePage = (e, data) => {
    const bookNumber = (+data.activePage - 1) * TOTALPAGE;
    setCurrentSet(books.slice(bookNumber, bookNumber + TOTALPAGE));
    setCurrentPage(+data.activePage - 1);
  }

  return (
    <Container className="bodyHeight">
      <Card
        fluid
        color='red'
        header='Upload your books or stories and share it for the world to see'
      />

      {loading 
        ? <CardListLoading /> 
        : currentSet.map((book, index) => (
            <Card.Group key={index}>
              <Card fluid>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Label as='a' image>
                      <img src='/images/defaultuser.png' />
                      {book.author}
                    </Label>
                    <Button
                      as={Link}
                      basic color='red'
                      to={{
                        pathname: `/bookdetail/${(index + (TOTALPAGE * currentPage))}`,
                        state: { selectedBook: book }
                    }}
                    >
                      View
                    </Button>
                  </div>
                  <Card.Header>{book.title}</Card.Header>
                  
                  <Card.Description style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {book.preview}
                    <div>
                      <Icon name='like' />{book.likes.length} Likes
                    </div>
                    
                  </Card.Description>
                 
                </Card.Content>
              </Card>
            </Card.Group>
          ))
      }

      <center style={{ marginTop: '.7rem'}}>
        <Pagination defaultActivePage={1} totalPages={Math.ceil(books.length / TOTALPAGE)} onPageChange={(e, data) => changePage(e, data)}/>
      </center>
      
    </Container>
  );
}

export default BookList;
