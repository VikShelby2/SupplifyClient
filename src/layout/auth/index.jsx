
import React from "react";

export default function AuthLayout({children , classNames}){


    return(
        <div
       className="flex pulsing-gradient  justify-center items-center"
         style={{
        minHeight: "100vh",}}>
 <div  className={`max-w-md max-h-[800px]   w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ${classNames} `}>
          {children}
 </div>
  
        </div>


    )
}