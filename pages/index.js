import React,{useEffect,useState,useContext} from 'react';

//INTERNAL IMPORT

import { ChatAppContext } from '@/Context/ChatAppContext';
import { NavBar } from '@/Components';

const ChatApp = () => {
  const A = useContext(ChatAppContext);
  return ( 
  
  <div>Hey <NavBar/> </div>);
  
};

export default ChatApp