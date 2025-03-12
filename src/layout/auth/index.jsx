
import React from "react";

export default function AuthLayout({children , classNames , animationTime = '5s'}){
  let style = {
     backgroundColor:' hsla(0,0%,100%,1) ' ,
      minHeight: "100vh" ,
     backgroundImage: ' radial-gradient(at 17% 0%, hsla(281deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 98% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 33% 87%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 65% 86%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 61% 21%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 36% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 31% 31%, hsla(248deg, 100%, 66%, 0.8) 0, transparent 50%), radial-gradient(at 42% 32%, hsla(248deg, 83%, 76%, 1) 0, transparent 50%), radial-gradient(at 0% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 10% 66%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 64% 56%, hsl(222.1, 100%, 57.3%) 0, transparent 50%), radial-gradient(at 68% 46%, hsla(180deg, 43%, 53%, 1) 0, transparent 50%), radial-gradient(at 99% 98%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 67% 59%, hsla(194deg, 100%, 73%, 1) 0, transparent 50%)' ,
     animation: `pulseGradient ${animationTime} infinite alternate ease-in-out`
    }

    return(
        <div
       
       className="flex   justify-center items-center"
         style={style}>
 <div  className={`max-w-md max-h-[800px]   w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ${classNames} `}>
          {children}
 </div>
  
        </div>


    )
}