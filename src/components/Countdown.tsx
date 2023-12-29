"use client"

import { useCountdown } from '~/hooks/useCountdown'

function Countdown() {
  const NEW_YEAR_DATE = new Date("2024-01-01T00:03:00")
  const { days, hours, minutes, seconds } = useCountdown(NEW_YEAR_DATE);

  return (
    <div className='flex w-full justify-center gap-10 text-white'>
      <div className='flex flex-col items-center'>
        <h4>วัน</h4>
        <h2 className='text-4xl lg:text-7xl font-medium'>{days}</h2>
      </div>
      <div className='flex flex-col items-center'>
        <h4>ชั่วโมง</h4>
        <h2 className='text-4xl lg:text-7xl  font-medium'>{hours}</h2>
      </div>
      <div className='flex flex-col items-center'>
        <h4>นาที</h4>
        <h2 className='text-4xl lg:text-7xl  font-medium'>{minutes}</h2>
      </div>
      <div className='flex flex-col items-center'>
        <h4>วินาที</h4>
        <h2 className='text-4xl lg:text-7xl  font-medium'>{seconds}</h2>
      </div>
    </div>
  )
}

export default Countdown