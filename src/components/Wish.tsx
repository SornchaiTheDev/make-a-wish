"use client"

import { useState } from 'react'
import { TWish } from '~/types/TWish'
import { Candy, Heart, Laugh, Link } from 'lucide-react'
import { useWish } from '~/hooks/useWish'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { formatNumber } from '~/utils'

interface Props {
  wishObject: TWish
}

function Wish({ wishObject }: Props) {
  const [isCopy, setIsCopy] = useState(false)
  const { wish, sendReaction } = useWish({ wishObject })
  const router = useRouter()

  const handleOnLoveClick = () => sendReaction("love")
  const handleOnCandyClick = () => sendReaction("candy")
  const handleOnLaughClick = () => sendReaction("laugh")


  const handleOnShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/wishes/${wish.id}`)
      setIsCopy(true)
    }
  }

  const handleOnClickRandomAWish = async () => {
    const wishId = await axios.get("/api/v1/wishes/random")

    router.push(`/wishes/${wishId.data}`)
  }

  const handleOnClickBack = () => {
    window.location.href = "/"
  }
  return (
    <>
      <div className='p-6 flex w-full text-black gap-4 bg-white/95 backdrop-blur-sm max-w-[40rem] flex-col border rounded-lg shadow-lg'>
        <h5>จาก</h5>
        <h2 className='text-lg'>{wish.from ?? "กำลังโหลด..."}</h2>
        <h5 className='mt-4'>คำอวยพร</h5>
        <div className='max-h-[14rem] overflow-y-auto'>
          <p className='text-lg'>{wish.body ?? "กำลังโหลด..."}</p>
        </div>
        <div className='flex gap-6'>
          <div className='flex flex-col w-fit items-center gap-1 mt-4'>
            <button onClick={handleOnLoveClick}>
              <Heart fill='#ef4444' stroke='transparent' />
            </button>
            <p>{formatNumber(wish.love) ?? "0"}</p>
          </div>
          <div className='flex flex-col w-fit items-center gap-1 mt-4'>
            <button onClick={handleOnCandyClick}>
              <Candy fill='#ec4899' stroke='transparent' />
            </button>
            <p>{formatNumber(wish.candy) ?? "0"}</p>
          </div>
          <div className='flex flex-col w-fit items-center gap-1 mt-4'>
            <button onClick={handleOnLaughClick}>
              <Laugh stroke='gold' />
            </button>
            <p>{formatNumber(wish.laugh) ?? "0"}</p>
          </div>
          <div className='flex flex-col w-fit items-center gap-1 mt-4'>
            <button onClick={handleOnShareClick}>
              <Link stroke='black' />
            </button>
            <p>{isCopy ? "คัดลอกแล้ว" : "คัดลอก"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <button onClick={handleOnClickBack} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full lg:w-48 mt-4">หน้าแรก</button>
        <button onClick={handleOnClickRandomAWish} className="hover:bg-white hover:text-black border-2 px-8 py-2 rounded-full w-full lg:w-48 mt-4">สุ่มอ่านคำอวยพร</button>
      </div>
    </>
  )
}

export default Wish