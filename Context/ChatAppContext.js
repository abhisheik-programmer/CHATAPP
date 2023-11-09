import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Internal IMPORT

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();
export const ChatAppProvider = ({ children }) => {
  //USESTATE
  const [account, setAccount] = useState("");
  const [userName, setuserName] = useState("");
  const [friendLists, setfriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //CHAT USER DATA
  const [currentUserNAme, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  //FETCH DATA TIME OF PAGE LOAD

  const fetchData = async () => {
    try {
      //GET CONTRACT

      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USERNAME
      const userName = await contract.getUsername(connectAccount);
      setuserName(userName);
      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      setfriendLists(friendLists);

      //GET ALL APP USER
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      setError("Please install and Connect your Wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You Have no Message");
    }
  };

  //CREATE ACCOUNT

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress)
        return setError("Name and AccountAddress, cannot be empty");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      setLoading(false);
      window.location.reload();
      await getCreatedUser.wait();
    } catch (error) {}
  };

  //ADD YOUR FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress) return "Please provide the required details";

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong");
    }
  };
  const sendMessage = async ({ msg, address }) => {
    try {
      if (msg || address) return setError("Please Type your Message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("please retry");
    }
  };

  //READ USER

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUdername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };
  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserNAme,
        currentUserAddress,
        connectWallet,
        CheckIfWalletConnected,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
