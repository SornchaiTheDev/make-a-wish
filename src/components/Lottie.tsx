"use client"

import { IPlayerProps, Player } from '@lottiefiles/react-lottie-player'
import { forwardRef } from 'react'

const Lottie = forwardRef<Player, IPlayerProps>((props, ref) => {
  return (
    <Player
      autoplay
      style={{ height: '100%', width: '90vw' }}
      {...{ ...props, ref, src: JSON.stringify(props.src) }}
    />
  )
})

Lottie.displayName = 'Lottie'

export default Lottie