"use client"

import { useState } from 'react'
import { formatNumber } from '~/utils'
import MakeAWish from './MakeAWish'
import { AnimatePresence } from 'framer-motion'
import Lottie from './Lottie'
import { PlayerEvent } from '@lottiefiles/react-lottie-player'
import Wish from './Wish'
import { TWish } from '~/types/TWish'




function WishSection() {
  const [isMakeAWishOpen, setIsMakeAWishOpen] = useState(false)
  const [isRandomAWishOpen, setIsRandomAWishOpen] = useState(false)
  const [isSent, setIsSent] = useState(false);

  const handleOnMakeAWishClick = () => {
    setIsMakeAWishOpen(true)
  }

  const handleOnCloseClick = () => {
    setIsMakeAWishOpen(false)
  }

  const handleOnSubmitAWish = (wish: TWish) => {
    setIsSent(true)
    setIsMakeAWishOpen(false)

  }

  const handleOnLottieEvent = (e: PlayerEvent) => {
    if (e === "complete") setIsSent(false)
  }

  const handleOnRandomAWishClick = () => {
    setIsRandomAWishOpen(true)
  }

  const onCloseRandomAWish = () => {
    setIsRandomAWishOpen(false)
  }

  return (
    <>
      {isSent && <div className='fixed bottom-0 left-1/2 -translate-x-1/2' ><Lottie onEvent={handleOnLottieEvent} src="https://lottie.host/c84fe12a-40af-4997-b889-6fa6c66b52ff/aExQRfpjJW.json" keepLastFrame style={{ width: "40rem" }} /></div>}
      <AnimatePresence>
        {isRandomAWishOpen && <Wish onClose={onCloseRandomAWish} />}
        {isMakeAWishOpen && <MakeAWish onClose={handleOnCloseClick} onSubmit={handleOnSubmitAWish} />}
      </AnimatePresence>

      <div className="w-full max-w-64">

        <h6 className="text-center my-4">คำอวยพรทั้งหมด <span>•</span> {formatNumber(1234)} ครั้ง</h6>

        <button onClick={handleOnRandomAWishClick} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full mt-10">สุ่มอ่านคำอวยพร</button>
        <div className="flex mx-auto my-4 w-1/2 gap-2 items-center">
          <div className="border flex-1 bg-white"></div>
          <p>หรือ</p>
          <div className="border flex-1 bg-white"></div>
        </div>
        <button onClick={handleOnMakeAWishClick} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full">เขียนคำอวยพร</button>
      </div>
    </>
  )
}

export default WishSection