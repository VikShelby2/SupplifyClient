import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Checkbox,
} from '@nextui-org/react'
import { Store, ShoppingBag, Ellipsis, Earth } from 'lucide-react'
export default function ChannelsModal({
  openModal,
  setOpenModal,
  setInput,
  input,
  updateSales,
  setBarcode,
  barcode,
  handleSave,
  variantChanges,
}) {
  const [enableSales, setEnableSales] = useState(true)
  const Action = () => {
    handleSave(enableSales)
    setOpenModal(false)
  }
  const toggleChannelStatus = () => {
    setInput((prev) => {
      const newInput = { ...prev }
      newInput.publishing.channels[0].isActive =
        !prev.publishing.channels[0].isActive
      return newInput
    })
  }
  const toggleChannelStatusPos = () => {
    setInput((prev) => {
      const newInput = { ...prev }
      newInput.publishing.channels[1].isActive =
        !prev.publishing.channels[1].isActive
      return newInput
    })
  }
  return (
    <Modal isOpen={openModal}>
      <ModalContent className="bg-[#fff]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-[#1d1d1d]">
              Edit Sales Channel
            </ModalHeader>
            <ModalBody>
              <div className="w-full grid items-center">
                <div className="flex items-center ">
                  <Checkbox
                    isSelected={input.publishing.channels[0].isActive}
                    onValueChange={toggleChannelStatus}
                    radius="sm"
                    color="secondary"
                  />
                  <div className="flex gap-1 items-center">
                    <Store className="size-5 text-violet-500" />
                    <span className="text-[#1d1d1d]">My Store</span>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Checkbox
                    isSelected={input.publishing.channels[1].isActive}
                    onValueChange={toggleChannelStatusPos}
                    radius="sm"
                    color="secondary"
                  />
                  <div className="flex gap-1 items-center">
                    <ShoppingBag className="size-5 text-violet-500" />
                    <span className="text-[#1d1d1d]">Point of Sale</span>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  setOpenModal(!openModal)
                }}
              >
                Close
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setOpenModal(!openModal)
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
