"use client"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import Message from "../Message/Message";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/abi.json"
import { toast } from "react-toastify";
import {Spinner} from "@nextui-org/react";

const contractAddress = '0xeaBEe785B2E71F5815d453ae9a94CD9ef7d28DF3'
const rpcUrl = 'https://rpc.testnet.fantom.network'; 
function ChatModal(props: any) {
  const [value, setValue] = useState<any>('')
  const [providers, setProviders] = useState<any>()
  const [contract, setContract] = useState<any>()
  const [account, setAccounts] = useState<any>()
  const [loading, setLoading] = useState<any>();
  const [message, setMessage] = useState<any>(false);
  useEffect(() => {
    initializeContract()
  }, [message])
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
      const contractSigner = await contractInstance.connect(signer);
      const response1 = await contractSigner.readMessage(props.address);
      setMessage(response1)
    }
  }

  
  const sendMessage = async () => {
    try{
      if(contract) {
        if (typeof (window as any).ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider((window as any).ethereum);
			    const signer = provider.getSigner();
          const contractSigner = contract.connect(signer);
          const response = await contractSigner.sendMessage(props.address, value);
          toast.success("Send successfully");
          // console.log(response);
        }
    }
  } catch (e: any) {
    toast.error(e.reason);
  }

}
  return ( 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Chat</ModalHeader>
              <ModalBody className="max-h-64 overflow-y-auto">
               
                    <Message message={message} />
                
              </ModalBody>
               <div className="flex flex-row w-full gap-3"> 
                    <Input size="sm" fullWidth={false} className="max-w-[320px] ml-4 mb-4" placeholder="Type Message..." onChange={(e) => setValue(e.target.value)}/>
                    <Button className="py-[23px]" onClick={sendMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
               </div>
            </>
          )}
        </ModalContent>
     );
}

export default ChatModal;