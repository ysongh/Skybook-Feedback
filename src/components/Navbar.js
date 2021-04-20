import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react'
import { SkynetClient } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';

const portal = 'https://siasky.net/';   // allow for developing on localhost
const client = new SkynetClient(portal);
const hostApp = "host-app.hns";
const dataDomain = 'localhost';

function Navbar() {
  const { mySky, setUserID, setMySky } = useContext(GlobalContext);
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const _mySky = await client.loadMySky(dataDomain);
        // check if user is already logged in with permissions
        const loggedIn = await _mySky.checkLogin();

        setMySky(_mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await _mySky.userID());
          history.push('/booklist');
        }
      } catch (e) {
        console.error(e);
      }
    }
    initMySky();
  }, [])

  const handleMySkyLogin = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
      history.push('/booklist');
    }
  };

  const handleMySkyLogout = async () => {
    // call logout to globally logout of mysky
    await mySky.logout();

    setLoggedIn(false);
    setUserID('');
    history.push('/');
  };

  return (
    <Menu color={'blue'} stackable pointing secondary>
      <Menu.Item
        as={Link}
        to="/"
        name='Skybook Feedback'
        onClick={() => setActiveItem('home')}
      />
      <Menu.Item
        as={Link}
        to="/"
        name='home'
        active={activeItem === 'home'}
        onClick={() => setActiveItem('home')}
      />
      <Menu.Item
        as={Link}
        to="/booklist"
        name='book list'
        active={activeItem === 'booklist'}
        onClick={() => setActiveItem('booklist')}
      />
      {loggedIn ? (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button secondary onClick={handleMySkyLogout}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
        
      ) : (
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary onClick={handleMySkyLogin}>Login</Button>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default Navbar;
