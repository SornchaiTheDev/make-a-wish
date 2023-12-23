"use client"

import { motion } from 'framer-motion'
import { X, Heart, Candy, Link, Laugh } from 'lucide-react'
import React from 'react'

interface Props {
  onClose: () => void
}

function Wish({ onClose }: Props) {
  return (
    <motion.div initial={{ bottom: 0 }} animate={{ bottom: [-700, 0] }} exit={{ bottom: [0, -700] }} className='fixed w-full flex justify-center items-center h-screen p-4 z-50'>
      <div className='w-full max-w-[32rem] rounded-xl border border-white bg-white/20 backdrop-blur-md'>
        <div className='relative'>
          <button onClick={onClose} className='absolute top-6 right-6 hover:bg-neutral-600 p-2 rounded-full'>
            <X size="1rem" />
          </button>

        </div>
        <div className='p-6 flex flex-col gap-2'>
          <h5>จาก</h5>
          <h2 className='text-lg'>เจ KUTECH</h2>
          <h5 className='mt-4'>คำอวยพร</h5>
          <div className='max-h-[14rem] overflow-y-auto'>
            <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quo nemo, eius eum consequatur sit sequi praesentium adipisci ab, neque odit accusamus dicta voluptates! Hic amet suscipit doloribus recusandae odit.
              Nulla voluptatum ipsam ad repellendus, quidem voluptate totam. Fugit suscipit nihil amet rem inventore, quam maxime soluta, cum facilis eveniet consectetur, repellendus distinctio aperiam pariatur possimus ullam at velit officia!
              Facere est cupiditate dolorem nemo obcaecati suscipit inventore eius in sit ea ipsa illo repudiandae officiis, nesciunt aliquid a sint dolor repellat accusantium debitis voluptatibus odit praesentium animi. Saepe, aliquam?</p>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button>
                <Heart fill='#ef4444' stroke='transparent' />
              </button>
              <p>1</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button>
                <Candy fill='#ec4899' stroke='transparent' />
              </button>
              <p>1</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button>
                <Laugh stroke='gold' />
              </button>
              <p>1</p>
            </div>
            <div className='flex flex-col w-fit items-center gap-1 mt-4'>
              <button>
                <Link stroke='white' />
              </button>
              <p>แชร์</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Wish