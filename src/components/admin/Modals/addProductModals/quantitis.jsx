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
export default function QuantityModal({
  openModal,
  setOpenModal,
  setQuantity,
  quantity,
  handleSave,
  handleFieldChange,
  variantChanges,
}) {
  const Action = () => {
    handleSave()
    setOpenModal(false)
  }
  return (
    <Modal
      isOpen={openModal}
      onClose={() => {
        setOpenModal(!openModal)
      }}
    >
      <ModalContent className="bg-[#1d1d1d]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white">
              Edit Quantity
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
                    Quantity
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <Input
                      name="quantity"
                      value={variantChanges.quantity}
                      onChange={(e) =>
                        handleFieldChange('quantity', e.target.value)
                      }
                      type="number"
                      id="zip-input"
                      aria-describedby="helper-text-explanation"
                      variant="priceWhite"
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
