import React, { useEffect, useMemo, useState } from 'react'
import NoProductView from '../components/noProductView'
import { storeAtom } from '../../../../../context/atoms/storeAtom'
import { useRecoilValue } from 'recoil'
import Table from './components/table'
import {
  Tabs,
  TabsContent,
  TabsList,
} from '../../../../../components/ui/tabs'
import { Spinner } from '@nextui-org/react'
import NormalModal from '../../../../../components/ui/basics/modal-normal'
import { Input } from '../../../../public/Home/components/input'
import FilterProducts from '../components/filterProducts'
import {
  handleAddTab,
  handleEditTab,
  handleListTabs,
  listProducts,
} from '../../../../../api/store/products'
import { ChevronsUpDown, Factory } from 'lucide-react'
import TableEdit from '../components/tableEdit'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../../../../context/redux/productsSlice'
import Header from '../components/header'
import TabsCo from '../components/tabs'

const ProductPage = () => {
  const products = useSelector((state) => state.products.products)
  const loading = useSelector((state) => state.products.loading)
  const [activeTab, setActiveTab] = useState('all')
  const [newTabId, setNewTabId] = useState('')
  const store = useRecoilValue(storeAtom)
  const dispatch = useDispatch()
  const tabs = useSelector((state) => state.tabs.tabs)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [editingTabName, setEditingTabName] = useState('')
  const [selectedProjects, setSelectedProjects] = useState([])
  const [isSelected, setSelected] = useState(false)
  const [openNewTabModal, setOpenNewTabModal] = useState(false)
  const [tabName, setTabName] = useState('')
  const [eidtingTab, setEditingTab] = useState(false)
  const [noOption, setNoOption] = useState(false)
  const toggleEdit = (tabName) => {
    setEditingTab(!eidtingTab)
    setEditingTabName(tabName)
  }
useEffect(() => {console.log(activeTab  , 'adasda ')}, [activeTab])
  

 const tabsConfig = useMemo(
  () => [
    { name: 'All', value: 'all', filter: () => true },

    ...tabs
      .filter((tab) => tab.table === 'product-inventory-table') // Only include tabs with 'product-inventory-table'
      .map((tab) => ({
        name: tab.name,
        value: tab.name,
        id: tab._id,
        optional: true,
        filter: (product) => product.tableView === tab.name,
      })),
  ],
  [tabs]
);

  const [filteredProducts, setFilteredProducts] = useState([])
  const [loadFilter, setLoadFilter] = useState(false)
  useEffect(() => {
    const filtered = {}
    tabsConfig.forEach((tab) => {
      filtered[tab.value] = products.filter(tab.filter)
    })
    setFilteredProducts(filtered)
  }, [products, tabsConfig])

  return (
    <>
      <div className="w-full h-full flex items-center flex-col gap-10">
        <Header title={'Inventory'} loading={loading} products={products} />
        <main
          className={`w-full flex  ${openSearch ? 'flex-row gap-3' : ''} flex-row gap-3`}
        >
          {!loading && products.length <= 0 && <NoProductView />}
          {!loading && products.length > 0 && (
            <div className=" relative rounded-[.75rem] h-fit  p-[5px] bg-[#fff]  w-full ">
              <Tabs defaultValue="all">
                <div className="w-full flex  items-center  justify-between">
                  {!openSearch && (
                    <div className=" p-1 flex items-center gap-2    rounded-t-xl h-full ">
                     
                      <TabsCo activeTab={activeTab} toggleEdit={toggleEdit} toggleTab={setActiveTab} tabsConfig={tabsConfig} />
                        <div
                          onClick={() => {
                            setOpenNewTabModal(true)
                          }}
                          className="inline-flex  items-center h-[40px] justify-center whitespace-nowrap group rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-violet-600     data-[state=active]:text-white  data-[state=active]:shadow-sm hover:bg-violet-600 hover:text-white text-black  flex items-center px-1 gap-1 text-black fill-none hover:text-white hover:fill-white"
                          value=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5  text-black group-hover:text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                    
                    </div>
                  )}
                  {openSearch && (
                    <div className="flex items-center p-1">
                      <Input
                        placeholder="Search for product"
                        variant="primaryWhiteSmall"
                      />
                    </div>
                  )}
                  <div className="flex  items-center  ">
                    <TabsList className="flex bg-white items-start  justify-start  ">
                      <div
                        onClick={() => {
                          setOpenSearch(!openSearch)
                        }}
                        className={`inline-flex  items-center justify-center whitespace-nowrap rounded-[.5rem] 
        ${openSearch ? 'pr-up-btn-isActive' : 'pr-up-btn'} px-[12px] py-[4px] text-sm font-medium
        `}
                        value=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          className="size-6 text-black"
                          stroke="black"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                          ></path>
                        </svg>
                      </div>
                    </TabsList>
                  </div>
                </div>
                {tabsConfig.map((tab) => (
                  <TabsContent
                    className="m-0"
                    value={tab.value}
                    key={tab.value}
                  >
                    {filteredProducts[activeTab]?.length > 0 ? (
                      // Show pre-filtered products
                      <div className="items-center h-full relative justify-center overflow-x-auto w-full">
                        <Table
                          selectedProjects={selectedProjects}
                          isSelected={isSelected}
                          setIsSelected={setSelected}
                          setSelectedProjects={setSelectedProjects}
                          filteredProducts={filteredProducts[activeTab]}
                        />
                      </div>
                    ) : (
                      // Show "No products found" if no products match the filter
                      <div className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center">
                        <h1>No products found</h1>
                        <span className="hover-underline-animation-primary">
                          Check out other products
                        </span>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
              {!isSelected && <TableEdit selected={selectedProjects.length} />}
            </div>
          )}
          {(loading || !products || !tabs) && (
            <div className=" relative rounded-[.75rem] h-[400px] flex justify-center items-center shadow-input p-[5px] bg-[#fff]  w-full ">
              <Spinner />
            </div>
          )}
          {openSearch && (
            <FilterProducts
              setNoOption={setNoOption}
              products={products}
              setProducts={dispatch(setProducts)}
            />
          )}
        </main>
      </div>

      <NormalModal
        isNewTab={true}
        storeId={store._id}
        tabType={'product-inventory-table'}
        tabName={tabName}
        press={() => {
          console.log('fsdfsf')
        }}
        open={openNewTabModal}
        setOpen={setOpenNewTabModal}
        title={'Create tab'}
        actionText={'Save'}
      >
        <div className="w-full flex flex-col ">
          <h1>Tab Name</h1>
          <Input
            value={tabName}
            onChange={(e) => {
              setTabName(e.target.value)
            }}
            variant="primaryWhite"
          />
        </div>
      </NormalModal>
      <NormalModal
        press={() => {
          handleEditTab(newTabId, editingTabName)
        }}
        open={eidtingTab}
        setOpen={setEditingTab}
        title={'Edit tab'}
        actionText={'Save'}
      >
        <div className="w-full flex flex-col ">
          <h1>Edit Tab</h1>
          <Input
            value={editingTabName}
            onChange={(e) => {
              setEditingTab(e.target.value)
            }}
            variant="primaryWhite"
          />
        </div>
      </NormalModal>
    </>
  )
}

export default ProductPage
