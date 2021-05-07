import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

function Spinner({ label = "Adding..." }) {
  return (
    <Dimmer active inverted>
      <Loader inverted content={label} />
    </Dimmer>
  )
}

export default Spinner;
