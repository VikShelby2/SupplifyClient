import React from 'react'
import ImgPrd from '../../../../../assets/private/store/products/noprdshic.png'
import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/button'
import { ShineBorder } from '../../../../../components/ui/animations/animatedBorder'
import Icon from '../../../../../components/ui/basics/Icon'
const NoProductView = () => {
  return (
    <div className=" relative overflow-hidden  w-full  rounded-xl bg-[#fff]">
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      {/*No Product */}
      <div
        className={`flex items-center flex-col  w-full h-full relative justify-center `}
      >
        <div className="flex w-full items-center lg:gap-20 p-10 px-[100px] justify-between">
          <div className="items-start mb-1 gap-3 grid justify-start w-[450px] mr-5">
            <div className="grid">
              <div className="text-start flex flex-start h-full">
                <h1 className="text-lg text-black font-semibold md:text-2xl">
                  Add your Product
                </h1>
              </div>
              <div className="text-start flex flex-start h-full">
                <p
                  className="text-stone-500"
                  style={{ fontWeight: '450', fontSize: '.85rem' }}
                >
                  Start by stocking your store with products your customers will
                  love
                </p>
              </div>
            </div>
            <div className="w-full flex gap-2">
              <Link to={'add'}>
                <Button radius="sm" color="secondary" size="sm">
                  <div className="flex items-center gap-2">
                    Add Product
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-[1rem]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                      />
                    </svg>
                  </div>
                </Button>
              </Link>
              <Button
                className="border-black"
                radius="sm"
                color="black"
                variant="ghost"
                size={'sm'}
              >
                Import Product
              </Button>
            </div>
          </div>
          <div className="w-[365px] p-4">
            <img className="w-full" src={ImgPrd} alt="Placeholder" />
          </div>
        </div>
        <div className="top-div w-full flex items-cetner p-10 px-[100px]">
          <div className="flex items-cetner w-full">
            <p
              className="text-stone-500"
              style={{ fontWeight: '450', fontSize: '.85rem' }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              consequuntur perferendis similique non itaque id assumenda quia
              accusantium nostrum nam ad distinctio neque excepturi, hic sint
              voluptatum inventore modi dignissimos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoProductView
