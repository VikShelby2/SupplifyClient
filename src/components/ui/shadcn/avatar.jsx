'use client'

import React, { forwardRef } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../../lib/utils'

export const Avatar = forwardRef((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...rest}
    />
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

export const AvatarImage = forwardRef((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...rest}
    />
  )
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export const AvatarFallback = forwardRef((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...rest}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
