"use client"

import { Candy, Heart, Laugh, Link } from 'lucide-react'
import React, { useState } from 'react'
import Lottie from '~/components/Lottie'
import { useWish } from '~/hooks/useWish'
import { useRouter } from 'next/navigation'
import firework from '~/lottie/firework.json'

function Wish({ params }: { params: { wishId: string } }) {
  const { wishId } = params
  const [isCopy, setIsCopy] = useState(false)
  const { wish, sendReaction } = useWish({ id: wishId })

  const handleOnLoveClick = () => sendReaction("love")
  const handleOnCandyClick = () => sendReaction("candy")
  const handleOnLaughClick = () => sendReaction("laugh")

  const handleOnShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/wishes/${wishId}`)
      setIsCopy(true)
    }
  }

  const handleOnClickMakeAWish = () => {
    window.location.href = "/"
  }

  const handleOnClickBack = () => {
    window.location.href = "/"
  }

  return (
    <>
      <div className="absolute top-1/2 lg:top-0 -translate-y-1/2 lg:translate-y-0 left-1/2 -translate-x-1/2 h-screen overflow-hidden -z-10">
        <Lottie src={firework} loop />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center h-screen p-4">
        <div className='p-6 flex w-full text-black gap-4 bg-white/95 backdrop-blur-sm max-w-[40rem] flex-col border rounded-lg shadow-lg'>
          <h5>จาก</h5>
          <h2 className='text-lg'>{wish?.from ?? "กำลังโหลด..."}</h2>
          <h5 className='mt-4'>คำอวยพร</h5>
          <div className='max-h-[14rem] overflow-y-auto'>
            <p className='text-lg'>{wish?.body ?? "กำลังโหลด..."}</p>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button onClick={handleOnLoveClick}>
                <Heart fill='#ef4444' stroke='transparent' />
              </button>
              <p>{wish?.love ?? "0"}</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button onClick={handleOnCandyClick}>
                <Candy fill='#ec4899' stroke='transparent' />
              </button>
              <p>{wish?.candy ?? "0"}</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button onClick={handleOnLaughClick}>
                <Laugh stroke='gold' />
              </button>
              <p>{wish?.laugh ?? "0"}</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button onClick={handleOnShareClick}>
                <Link stroke='black' />
              </button>
              <p>{isCopy ? "คัดลอกแล้ว" : "คัดลอก"}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handleOnClickBack} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-48 mt-4">ย้อนกลับ</button>
          <button onClick={handleOnClickMakeAWish} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-48 mt-4">เขียนคำอวยพร</button>
        </div>
      </div>
    </>
  )
}

export default Wish