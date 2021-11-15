import React from 'react'
import { Header, Modal } from 'semantic-ui-react'

import AddBook from '../pages/AddBook';

function PublishModal({ open, setOpen, pdfData }) {
  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='book' content='Publish Book' />
      <Modal.Content>
        <AddBook pdfData={pdfData} setOpen={setOpen}/>
      </Modal.Content>
    </Modal>
  )
}

export default PublishModal