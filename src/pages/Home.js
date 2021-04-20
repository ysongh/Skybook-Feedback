import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';

function Home() {
  const { mySky, setUserID } = useContext(GlobalContext);
  const history = useHistory();


  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
