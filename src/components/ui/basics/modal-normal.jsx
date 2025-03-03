import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { handleAddTab } from "../../../api/store/products";

export default function NormalModal({
  children,
  setOpen,
  isNewTab = false ,
  open,
  actionText,
  closeText = "Close",
  press,
  tabName  , 
  storeId ,
  tabType ,
  title,
}) {
  const dispatch = useDispatch()
  const handleClick = () =>{
     isNewTab ? dispatch(handleAddTab(tabName , storeId , tabType , setOpen  )) : press()
  }
  return (
    <Modal 
    classNames={{
      base: "rounded-lg shadow-none" // or any other Tailwind border radius class
    }}
    isOpen={open} onOpenChange={setOpen}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button className="pr-up-btn"  onClick={() => setOpen(false)}>
            {closeText}
          </button>
          <button className="pr-up-btn-dark"  onClick={handleClick}>
            {actionText}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
