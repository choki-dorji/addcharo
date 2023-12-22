"use client";
import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Input, Button} from "@nextui-org/react";
import InputsPassword from "../Inputs/Inputs";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import abi from "@/abi.json";
import 'react-toastify/dist/ReactToastify.css';
import { getAuthData } from "@/State/auth/auth-slice";
import { useDispatch } from "react-redux";

const contractAddress = '0xeaBEe785B2E71F5815d453ae9a94CD9ef7d28DF3'
const rpcUrl = 'https://rpc.testnet.fantom.network'; 
function LoginPage() {
  const [username, setUsername] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const [providers, setProviders] = useState<any>()
  const [contract, setContract] = useState<any>()
  const [account, setAccounts] = useState<any>()
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    initializeContract()
  }, [])
  const initializeContract = async() => {
    if (typeof (window as any).ethereum !== 'undefined') {
			const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
			setProviders(provider)
      const metaProvider = new ethers.providers.Web3Provider((window as any).ethereum);
		   const accounts = await metaProvider.listAccounts();
       setAccounts(accounts[0])
			const signer = provider.getSigner(accounts[0]);
			const contractInstance = new ethers.Contract(contractAddress, abi, signer);
			setContract(contractInstance);
			}
	  }
  
  const handleClick = async () => {
    // console.log(username, password);
    try{
      if(contract) {
        if (typeof (window as any).ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
			    const signer = provider.getSigner();
          const contractSigner = contract.connect(signer);
          const response = await contractSigner.createAccount(account, username);
          toast.success("registered Successfully");
        }
    }
  } catch (e: any) {
    toast.error(e.reason);
  }
}
const handleRoute = async () => {
  try{
    if(contract) {
      if (typeof (window as any).ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const contractSigner = contract.connect(signer);
        const response = await contractSigner.login(username, account);
        toast.success("Logged in Successfully");
        dispatch(getAuthData({username: username, address: account}))
        router.push('/');
      }
  }
} catch (e: any) {
  toast.error(e.reason);
}
 
}
  return (
        <div className="w-1/2">
          <ToastContainer position="top-center" />
        <Card className="max-w-full">
          <CardHeader className="flex justify-center mb-10">
          <h1 className="text-4xl font-bold text-center">Login</h1>
          </CardHeader>
          <CardBody className="flex gap-3 justify-center items-center w-full">
            <InputsPassword datatype = "email" setEmail={setUsername} />
            <InputsPassword datatype = "password" setPassword={setPassword} />
          </CardBody>
          <CardFooter className="flex flex-col gap-3 justify-center items-center w-full mb-10">
            <Button onClick={handleClick} className="w-[50%] bg-blue-500">Create Account</Button>
            <Button onClick={handleRoute} className="w-[50%] border border-blue-500">Login</Button>
          </CardFooter>
        </Card>
        
        </div>
     );
}

export default LoginPage;