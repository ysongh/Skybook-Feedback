import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import AddBook from '../pages/AddBook';

function PublishModal({ open, setOpen, title, body }) {
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='book' content='Publish Book' />
      <Modal.Content>
        <AddBook selectedTitle={title} selectedBody={body} setOpen={setOpen}/>
      </Modal.Content>
    </Modal>
  )
}

export default PublishModal