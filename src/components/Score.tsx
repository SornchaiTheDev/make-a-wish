"use client"
import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
function Score() {
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [selected, setSelected] = useState(-1);
  const notSelected = selected === -1;

  return (
    <div className='flex gap-2'>
      {new Array(5).fill("").map((_, index) =>
        <Star onClick={() => setSelected(index)} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => notSelected && setHoverIndex(-1)}
          key={index} size="3rem" fill={hoverIndex >= index || selected >= index ? 'gold' : "transparent"} stroke="gold" strokeWidth={1} />
      )}

    </div>
  )
}

export default Score