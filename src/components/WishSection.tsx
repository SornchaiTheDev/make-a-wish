"use client"

import { useState } from 'react'
import { formatNumber } from '~/utils'
import MakeAWish from './MakeAWish'
import { AnimatePresence } from 'framer-motion'
import Lottie from './Lottie'
import { PlayerEvent } from '@lottiefiles/react-lottie-player'
import { useWishCount } from '~/hooks/useWishCount'
import axios from 'axios'
import { TAddWish } from '~/types/TAddWish'
import send from '~/lottie/send.json'
import { useRouter } from 'next/navigation'

function WishSection() {
  const [isMakeAWishOpen, setIsMakeAWishOpen] = useState(false)
  const [isRandomWishClick, setIsRandomWishClick] = useState(false)
  const [wishId, setWishId] = useState("")
  const [isSent, setIsSent] = useState(false);
  const { wishCount } = useWishCount()

  const handleOnMakeAWishClick = () => {
    setIsMakeAWishOpen(true)
  }

  const handleOnCloseClick = () => {
    setIsMakeAWishOpen(false)
  }

  const handleOnSubmitAWish = async (wish: TAddWish) => {
    setIsSent(true)
    setIsMakeAWishOpen(false)

    const res = await axios.post("/api/v1/wishes", wish)

    setWishId(res.data)

  }

  const handleOnLottieEvent = (e: PlayerEvent) => {
    if (e === "complete") {
      setIsSent(false)
      // if (wishId === "RATE_LIMIT") return;
      window.location.href = `/wishes/${wishId}`
    }
  }

  const handleOnRandomAWishClick = async () => {
    setIsRandomWishClick(true)

    if (isRandomWishClick) return;
    const wishId = await axios.get("/api/v1/wishes/random")
    window.location.href = `/wishes/${wishId.data}`
  }

  return (
    <>
      {isSent && <div className='fixed bottom-0 left-1/2 -translate-x-1/2' ><Lottie onEvent={handleOnLottieEvent} src={send} keepLastFrame style={{ width: "40rem" }} /></div>}
      <AnimatePresence>
        {isMakeAWishOpen && <MakeAWish onClose={handleOnCloseClick} onSubmit={handleOnSubmitAWish} />}
      </AnimatePresence>

      <div className="w-full max-w-64">
        <h6 className="text-center my-4">คำอวยพรทั้งหมด <span>•</span> {formatNumber(wishCount)} ครั้ง</h6>
        <button onClick={handleOnRandomAWishClick} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full mt-10">{isRandomWishClick ? "กำลังสุ่ม..." : "สุ่มอ่านคำอวยพร"}</button>
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