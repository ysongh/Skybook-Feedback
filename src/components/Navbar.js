import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'
import { SkynetClient } from "skynet-js";
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import { GlobalContext } from '../context/GlobalState';

const portal = 'https://siasky.net/';   // allow for developing on localhost
const client = new SkynetClient(portal);
const contentRecord = new ContentRecordDAC();
const hostApp = "host-app.hns";
const dataDomain = 'localhost';

function Navbar() {
  const { userID, mySky, setUserID, setMySky } = useContext(GlobalContext);
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const _mySky = await client.loadMySky(dataDomain);
        console.log(_mySky)

        // load necessary DACs and permissions
        await _mySky.loadDacs(contentRecord);

        // check if user is already logged in with permissions
        const loggedIn = await _mySky.checkLogin();

        setMySky(_mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await _mySky.userID());
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
    <Menu color="green" inverted pointing>
      <Container>
        <img src='/images/logo.png' style={{ width: '7rem', paddingTop: '.5rem'}} />
        <Menu.Item
          as={Link}
          to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={() => setActiveItem('home')}
        />
        {userID && <Menu.Item
          as={Link}
          to="/addbook"
          name='add book'
          active={activeItem === 'addbook'}
          onClick={() => setActiveItem('addbook')}
        />}
        {loggedIn ? (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='red' onClick={handleMySkyLogout}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='black' onClick={handleMySkyLogin}>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
}

export default Navbar;
