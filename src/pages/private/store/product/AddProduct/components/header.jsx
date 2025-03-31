import React from 'react'
import { motion } from 'framer-motion'
import Button from '../../../../../../components/ui/basics/button'
import Icon from '../../../../../../components/ui/basics/Icon'
import { BsExclamationCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Alert } from '@heroui/alert'
const Header = ({
  productSaved,
  handelEditProduct,
  handleSubmit,
  titleFilled,
  store,
}) => {
  return (
    <div className="grid grid-cols-1 w-full items-center gap-4">
      <div className="items-center gap-4 justify-start w-full flex">
        <Link to={`/store-panel/products`}>
          <Button
            isIconOnly
            className="h-[35.778px] p-2 pr-up-btn bg-white hover:bg-[#ececec]"
          >
            <Icon name="arrow-left" />
          </Button>
        </Link>

        <h1 className="text-lg dark:text-white font-semibold md:text-2xl text-black">
          Add Product
        </h1>
      </div>

      {titleFilled && !productSaved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="w-full items-center rounded-md  gap-2 md:ml-auto flex justify-between"
        >
          <Alert
            color="secondary"
            variant="faded"
            className={{
              base: '',
            }}
            description={''}
            title={'Unsaved Product'}
            endContent={
              <div className="items-center gap-2 flex justify-end">
                <button variant="outline" size="sm" className="pr-up-btn-dark">
                  Discard
                </button>
                <button
                  size="sm"
                  className="pr-up-btn"
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  <span>Save</span>
                </button>
              </div>
            }
          />
        </motion.div>
      )}
      {productSaved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="w-full items-center rounded-md  gap-2 md:ml-auto flex justify-between"
        >
          <Alert
            color="success"
            variant="faded"
            className={{
              base: '',
            }}
            description={''}
            title={'Product Saved'}
            endContent={
              <div className="items-center gap-2 flex justify-end">
                <button variant="outline" size="sm" className="pr-up-btn-dark">
                  Go Back
                </button>
                <button
                  size="sm"
                  className="pr-up-btn"
                  onClick={() => {
                    handelEditProduct()
                  }}
                >
                  <span>Edit </span>
                </button>
              </div>
            }
          />
        </motion.div>
      )}
    </div>
  )
}

export default Header
