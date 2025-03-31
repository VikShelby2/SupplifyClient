import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from '@nextui-org/react'
import { Input } from '../../../../pages/public/Home/components/input'

export default function BarcodeModal({
  openModal,
  setOpenModal,
  handleFieldChange,
  setBarcode,
  barcode,
  handleSave,
  variantChanges,
}) {
  const Action = () => {
    handleSave()
    setOpenModal(false)
  }
  return (
    <Modal isOpen={openModal}>
      <ModalContent className="bg-[#1d1d1d]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
              Edit Barcode
            </ModalHeader>
            <ModalBody>
              <div className={`grid grid-cols-1 gap-[.5rem] `}>
                <form class=" m-0 ">
                  <label
                    for="zip-input"
                    style={{
                      fontFamily: 'Arabato',
                      fontWeight: '450',
                    }}
                    class="text-[.834rem] text-white pl-[2px]"
                  >
                    Barcode
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <Input
                      variant="primaryWhite"
                      name="barcode"
                      value={variantChanges.barcode}
                      onChange={(e) =>
                        handleFieldChange('barcode', e.target.value)
                      }
                      required
                    />
                  </div>
                </form>
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
                  Action()
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
