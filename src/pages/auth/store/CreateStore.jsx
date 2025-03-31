import React, { useEffect, useState } from 'react'

import { MorphingText } from '../../../components/ui/morphyne-text'
import { HoverEffectContainer } from '../../../components/ui/tabssp'
import {
  Branding,
  Describe,
  Market,
  ProductsChoice,
  SellPosition,
} from './components/analyticChoice'
import { useSelector } from 'react-redux'
import StoreForm from './components/storeForm'
import Aurora from '../../../components/ui/animations/auraBackground'
import BlurText from '../../../components/ui/animations/blurText'

export default function CreateStore({}) {
  const [animationTime, setAnimationTime] = useState('5s')
  const [style, setSyle] = useState({
    minHeight: '100vh',
  })

  const switchTab = (index, tabs, setTabs, setCurrentTab) => {
    // Move the selected tab to the front
    const reorderedTabs = [tabs[index], ...tabs.filter((_, i) => i !== index)]
    setTabs(reorderedTabs) // Update the tabs with the reordered list
    setCurrentTab(0) // The selected tab is now the first one
  }
  const [showStoreForm, setShowForm] = useState(false)
  const switchTabBackward = (index, tabs, setTabs, setCurrentTab) => {
    // Move the selected tab to the previous position (backwards)
    const reorderedTabs = [...tabs.filter((_, i) => i !== index), tabs[index]]
    setTabs(reorderedTabs) // Update the tabs with the reordered list
    setCurrentTab(0) // Move to the previous tab, or stay at the first tab if already at the start
  }

  const [showMessage, setShowMessage] = useState(true)
  const [onlyVisible, setOnlyVisible] = useState(0)
  const { user, isAuthinticated } = useSelector((state) => state.user)

  const tabsCon = [
    {
      title: 'Product',
      value: 'product',
      content: (
        <SellPosition
          click={() => switchTab(1, tabs, setTabs, setCurrentTab)}
        />
      ),
    },
    {
      title: 'Services',
      value: 'services',
      content: (
        <ProductsChoice
          back={() => switchTabBackward(0, tabs, setTabs, setCurrentTab)}
          next={() => switchTab(2, tabs, setTabs, setCurrentTab)}
        />
      ),
    },
    {
      title: 'Playground',
      value: 'playground',
      content: (
        <Describe
          back={() => switchTabBackward(1, tabs, setTabs, setCurrentTab)}
          next={() => switchTab(3, tabs, setTabs, setCurrentTab)}
        />
      ),
    },
    {
      title: 'Content',
      value: 'content',
      content: (
        <Market
          back={() => switchTabBackward(3, tabs, setTabs, setCurrentTab)}
          next={() => switchTab(4, tabs, setTabs, setCurrentTab)}
        />
      ),
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <Branding
          back={() => switchTabBackward(3, tabs, setTabs, setCurrentTab)}
          next={() => setShowForm(true)}
        />
      ),
    },
  ]
  const [tabs, setTabs] = useState(tabsCon)
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    console.log('Animation Time updated:', animationTime)
  }, [animationTime])

  const handleAnimationComplete = () => {
    setShowMessage(false)
  }
  return (
    <div
      className="relative bg-black overflow-hidden max-h-screen"
      style={style}
    >
      <Aurora
        colorStops={['#a51aff', '#a51aff', '#a51aff']}
        blend={0.2}
        amplitude={4.0}
        speed={0.7}
      />

      {showMessage && (
        <div className="absolute inset-0 h-screen max-h-screen w-full flex items-center justify-center pointer-events-none">
          <BlurText
            text="Welcome!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-[4rem] font-extrabold text-white "
          />
        </div>
      )}
      {!showMessage && !showStoreForm && (
        <div className="absolute inset-0 h-screen max-h-screen w-full flex items-center justify-center ">
          <div className="w-full h-full relative z-10 flex items-center justify-center max-h-screen">
            <div className="h-[400px] relative z-10  justify-center items-center [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  my-40 mt-0">
              <HoverEffectContainer
                setTabs={setTabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabs={tabs}
                isOnlyCurrentTabVisible={onlyVisible}
                switchTab={switchTab}
              />
            </div>
          </div>
        </div>
      )}
      {!showMessage && showStoreForm && (
        <div className="absolute inset-0 h-screen max-h-screen w-full flex items-center justify-center ">
          <StoreForm setAnimationTime={setSyle} />
        </div>
      )}
    </div>
  )
}
