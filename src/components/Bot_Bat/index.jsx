import React, { useEffect } from 'react'

export default function BotBat({position, move}) {

   

  return (
    <div className={`bat-right`} style={{transform:`translateY(${position}px)`}}></div>
  )
}
