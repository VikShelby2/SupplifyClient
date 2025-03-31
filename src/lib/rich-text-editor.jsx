'use client'
import '../assets/private/rich-text-editor.css'
import React, { useRef, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import Heading from '@tiptap/extension-heading'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Table as TableIcon,
  Image as ImageIcon,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

export default function RichTextEditor() {
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Heading.configure({ levels: [1, 2, 3] }),
      ImageResize,
      GlobalDragHandle.configure({
        dragHandleWidth: 20, // default

        // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic
        // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an
        // element to a position that is max. 99px away from the edge of the screen
        // You can set this to 0 to prevent auto scrolling caused by this extension
        scrollTreshold: 100, // default

        // The css selector to query for the drag handle. (eg: '.custom-handle').
        // If handle element is found, that element will be used as drag handle.
        // If not, a default handle will be created
        dragHandleSelector: '.custom-drag-handle', // default is undefined

        // Tags to be excluded for drag handle
        // If you want to hide the global drag handle for specific HTML tags, you can use this option.
        // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
        excludedTags: [], // default
      }),
    ],
    content: '',
  })

  const addImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          editor?.chain().focus().setImage({ src: result }).run()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()
  }
  const toggleItem = (index) => {
    setItems((prevItems) => {
      const isActive = prevItems[index].isActive // Get current active state of the clicked item

      return prevItems.map((item, i) => ({
        ...item,
        isActive: i === index ? !isActive : false, // Toggle if it's the clicked item, deactivate others
      }))
    })
  }
  const [items, setItems] = useState([
    {
      name: 'Item 1',
      isActive: false,
      icon: <Bold className="w-5 h-5" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: 'Item 2',
      isActive: false,
      icon: <Italic className="w-5 h-5 " />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: 'Item 3',
      isActive: false,
      icon: <Underline className="w-5 h-5 " />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      name: 'Item 1',
      isActive: false,
      icon: <Strikethrough className="w-5 h-5" />,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      name: 'Item 2',
      isActive: false,
      icon: <TableIcon className="w-5 h-5 " />,
      onClick: addTable,
    },
    {
      name: 'Item 3',
      isActive: false,
      icon: <ImageIcon className="w-5 h-5 " />,
      onClick: addImage,
    },
  ])
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['Heading 2']))

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  )
  return (
    <div className="bg-white rounded-lg shadow-input">
      <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
        <div className="flex items-center ">
          <Dropdown
            classNames={{
              base: 'before:bg-default-200 ', // change arrow background
              content:
                'p-0 border-small border-divider bg-background w-auto min-w-2',
            }}
          >
            <DropdownTrigger>
              <div
                className={`inline-flex mr-1  items-center justify-center whitespace-nowrap rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  hover:bg-[#ebebeb] shadow-input   `}
              >
                {selectedValue}
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem
                hideSelectedIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                key="Heading 1"
              >
                Heading 1
              </DropdownItem>
              <DropdownItem
                hideSelectedIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                key="Heading 2"
              >
                Heading 2
              </DropdownItem>
              <DropdownItem
                hideSelectedIcon
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                key="Heading 3"
              >
                Heading 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                // Call item.onClick if it exists
                if (item.onClick) {
                  item.onClick() // Invoke the onClick function
                }

                // Call toggleItem with the current index
                toggleItem(index)
              }}
              className={`inline-flex  items-center justify-center whitespace-nowrap rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  ${item.isActive ? 'bg-violet-600 text-white shadow-sm' : 'hover:bg-[#ebebeb]'}     `}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  )
}
