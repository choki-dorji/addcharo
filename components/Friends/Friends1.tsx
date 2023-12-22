"use client"
import React, { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { ethers } from "ethers";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import abi from "@/abi.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { faCoffee, faComment } from "@fortawesome/free-solid-svg-icons";
import Modal1 from "../Modals/Modal";
import ChatModal from "../Modals/Modal";


const contractAddress = '0xeaBEe785B2E71F5815d453ae9a94CD9ef7d28DF3'
const rpcUrl = 'https://rpc.testnet.fantom.network'; 

export default function FriendList(props: any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isFollowed, setIsFollowed] = useState(false);
  const [addresses, setAddress] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const [providers, setProviders] = useState<any>()
  const [contract, setContract] = useState<any>()
  const [account, setAccounts] = useState<any>()
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
      setAddress(props.address);
    }
    
 
  //Todo: make sure that you canbt add your seldf as a friends
  return (
    <>
      <Card className="w-[70%]">
        <ToastContainer />
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">Name: {props.name}</h4>
              <h5 className="text-small tracking-tight text-default-400">Address: {props.address}</h5>
            </div>
          </div>
          <div className="flex gap-3">
              <Button
              className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={onOpen}
              >
              {props.friend ? (
                <>
                    <FontAwesomeIcon icon={faComment} />
                    Chat
                </>
              ) : "Add Friend"}
              </Button>
              <Button
              className="bg-transparent text-foreground border-default-200 border border-blue-500 text-blue-500"
              color="primary"
              radius="full"
              size="sm"
              variant={"solid"}
              onPress={() =>{}}
              >
              View Profile
              </Button>
          </div>
        </CardHeader>
       
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">97.1K</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </Card>

    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>        
        <ChatModal address={addresses}/>
      </Modal>

    </>

    </>
  );
}
