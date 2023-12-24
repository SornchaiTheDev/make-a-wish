"use client"
import { X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { TAddWish } from '~/types/TAddWish'

interface Props {
  onClose: () => void
  onSubmit: (wish: TAddWish) => void
}

function MakeAWish({ onClose, onSubmit }: Props) {
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");

  const fromLength = from.length;
  const bodyLength = body.length;

  const handleOnFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _fromLength = e.target.value.length;

    if (_fromLength > 20) return;
    setFrom(e.target.value);
  }

  const handleOnBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const _bodyLength = e.target.value.length;

    if (_bodyLength > 200) return;
    setBody(e.target.value);
  }

  const submitAWish = () => {
    if (from.length === 0 || body.length === 0) return;

    onSubmit({ from, body });
  }

  return (
    <>
      <motion.div initial={{ bottom: 0 }} animate={{ bottom: [-500, 0] }} exit={{ bottom: [0, -500] }} className='fixed left-1/2 -translate-x-1/2 w-full max-w-[40rem] h-96 rounded-t-2xl border border-white/30 bg-white/20 backdrop-blur-md p-4 flex flex-col gap-2'>
        <button onClick={onClose} className='self-end hover:bg-white/20 p-2 rounded-full'>
          <X size="1rem" />
        </button>
        <h4>จาก</h4>
        <input value={from} onChange={handleOnFromChange} placeholder='ชื่อผู้ส่ง' className='text-lg outline-none w-full bg-transparent border p-2 border-white/30 rounded-lg' />
        <p className='text-xs text-neutral-400'>{fromLength}/20</p>
        <h4 className='mt-4'>คำอวยพร</h4>
        <textarea value={body} onChange={handleOnBodyChange} className='w-full outline-none text-lg bg-transparent border border-white/30 p-2 rounded-lg' placeholder='เขียนคำอวยพรตรงนี้' rows={6} />
        <p className='text-xs text-neutral-400'>{bodyLength}/200</p>
        <button onClick={submitAWish} className='border w-full rounded-full bg-neutral-700 hover:bg-neutral-800 py-2 text-white mt-4'>ส่ง</button>
      </motion.div>
    </>
  )
}

export default MakeAWish