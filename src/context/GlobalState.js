import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
  userID: "",
  mySky: null,
  contentRecord: null
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, inititalState);

  function setUserID(userId){
    dispatch({
      type: "SET_USERID",
      payload: userId
    })
  }

  function setMySky(mySky){
    dispatch({
      type: "SET_MYSKY",
      payload: mySky
    })
  }

  function setContentRecord(contentRecord){
    dispatch({
      type: "SET_CONTENTRECORD",
      payload: contentRecord
    })
  }

  return (<GlobalContext.Provider value={{
    userID: state.userID,
    mySky: state.mySky,
    contentRecord: state.contentRecord,
    setUserID,
    setMySky,
    setContentRecord
  }}>
    {children}
  </GlobalContext.Provider>);
} 