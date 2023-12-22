import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import Message from "../Message/Message";

function ChatModal() {
    return ( 
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Chat</ModalHeader>
              <ModalBody>
               <Message />
              </ModalBody>
               <div className="flex flex-row w-full gap-3"> 
                    <Input size="sm" fullWidth={false} className="max-w-[320px] ml-4 mb-4" placeholder="Type Message..."/>
                    <Button className="py-[23px]">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
               </div>
            </>
          )}
        </ModalContent>
     );
}

export default ChatModal;