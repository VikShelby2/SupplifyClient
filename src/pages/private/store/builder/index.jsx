import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Iphone15Pro } from './components/mockups'
import wireframe from '../../../../assets/private/store/products/wireframe.png'
import { Edit, Eye, Pen, Settings, Upload } from 'lucide-react'
import { ShineBorder } from './components/animatedBorder'
import { Dropdown, DropdownItem, DropdownMenu } from '@heroui/react'
import { DropdownTrigger } from '@heroui/react'
import ThemePreview from './components/themePreview'
import Heading from './components/heading'
import StyleHub from './components/styleHub'
const Theme = () => {
  return (
    <div className="w-full px-[200px] mt-8 h-full flex items-center flex-col gap-5">
      <Heading />
      <div className="w-full h-full flex items-center  ">
        <ThemePreview />
      </div>
      <StyleHub />
    </div>
  )
}

export default Theme
