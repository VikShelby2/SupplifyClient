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
export default function SkuModal({
  openModal,
  handleFieldChange,
  variantChanges,
  setOpenModal,
  setSku,
  sku,
  handleSave,
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
              Edit Sku
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
                    SKU (Stock per unit)
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <Input
                      name="sku"
                      value={variantChanges.sku}
                      onChange={(e) => handleFieldChange('sku', e.target.value)}
                      type="text"
                      id="zip-input"
                      aria-describedby="helper-text-explanation"
                      class="
               w-full h-[38px] border bg-[#1d1d1d]  text-white text-sm rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-[#8a50fe] focus:ring-offset-2 focus:border-black 
    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 :placeholder-gray-400 dark:text-white 
    dark:focus:ring-black dark:focus:border-black 
    group-hover/input:shadow-none transition duration-400"
                      style={{ paddingInlineStart: '.5rem', cursor: 'pointer' }}
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
