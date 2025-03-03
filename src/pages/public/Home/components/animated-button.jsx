import React from 'react'
import './styles/animated-button.css'
const AnimatedButton = () => {
  return (

<button class="bookmarkBtn">
  <span class="IconContainer">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 icon text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

  </span>
  <p class="text">Log in</p>
</button>

  )
}

export default AnimatedButton
