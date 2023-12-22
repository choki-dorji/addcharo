"use client"
import Friends from "@/components/Friends/Friends";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "@/abi.json";
import { toast } from "react-toastify";
import FriendList from "@/components/Friends/Friends1";

const contractAddress = '0xeaBEe785B2E71F5815d453ae9a94CD9ef7d28DF3';
const rpcUrl = 'https://rpc.testnet.fantom.network';

function UserFriend() {
  const [providers, setProviders] = useState<any>();
  const [accounts, setAccounts] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [allusers, setAllUsers] = useState<any>();

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      setProviders(provider);
      const metaProvider = new ethers.providers.Web3Provider((window as any).ethereum);
      const accounts = await metaProvider.listAccounts();
      setAccounts(accounts[0]);
      const signer = provider.getSigner(accounts[0]);
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
    }
  };

  useEffect(() => {
    handleClick();
  }, [contract]);

  const handleClick = async () => {
    try {
      if (contract) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const contractSigner = contract.connect(signer);
        const response = await contractSigner.getMyfriends();
        setAllUsers(response);
      }
    } catch (e: any) {
      console.log("error", e);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      {allusers ? 
        allusers?.map((items: any, index: number) => (
            <FriendList key={index} name={items[0]} address={items[1]} friend={true} />
        )) : <div> No friends </div>
    }
    </div>
  );
}

export default UserFriend;
