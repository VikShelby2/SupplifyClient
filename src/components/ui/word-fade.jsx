'use client'

import { motion, Variants } from 'framer-motion'

import { cn } from '../../lib/utils'

export function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}) {
  const _words = words.split(' ')

  return (
    <motion.h1
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        ' items-center flex  from-white from-50% to-[#9c9c9c] bg-text bg-clip-text text-transparent text-center text-4xl  w-full font-bold pb-1  tracking-[-0.02em]',
        className
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={word} variants={variants} custom={i}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.h1>
  )
}
