import React from 'react'
import './styles/loading.css'
import logo from '../../../../assets/public/home/home-logo-purple.svg'
export default function Loading() {
  return (
    <>
      <div className="preloader">
        <img src={logo} alt="logo" />
        <div className="preloader-icon" />
      </div>
    </>
  )
}
