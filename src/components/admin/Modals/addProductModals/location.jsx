import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure , price} from "@nextui-org/react";
export default function LocationModal({openModal , setOpenModal ,setValue}){
    

    return(
        <Modal isOpen={openModal} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={()=>{setOpenModal(!openModal)}}>
                  Close
                </Button>
                <Button color="primary" onClick={()=>{setOpenModal(!openModal)}}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}