import React, { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../components/ui/card'
import { Label } from '../../../../../public/Home/components/label'
export default function Status({ handleStatusChange }) {
  const status = [
    { label: 'Active' },
    { label: 'Archived' },
    { label: 'Drafted' },
  ]
  const [inputValue, setInputValue] = useState('Active')

  // Handler to update state when input changes
  const handleChange = (event) => {
    const newValue = event.target.value
    setInputValue(newValue)
    handleStatusChange(newValue)
  }
  return (
    <>
      <Card
        x-chunk="dashboard-07-chunk-3"
        className="shadow-input rounded-[.75rem]"
        style={{ background: '#fff' }}
      >
        <CardHeader>
          <CardTitle className="text-black">Product Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="status " className="text-black">
                Status
              </Label>
              <Select
                items={status}
                label={'Status'}
                defaultSelectedKeys={['Active']}
                placeholder={`Select a Status`}
                className="max-w-xs "
                color={`${inputValue === 'Active' ? 'success' : inputValue === 'Drafted' ? 'default' : inputValue ? 'secondary' : ''}`}
                onChange={handleChange}
              >
                {(stat) => (
                  <SelectItem key={stat.label} value={stat.label}>
                    {stat.label}
                  </SelectItem>
                )}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
