import React from 'react'

export default function Bat({position, move}) {

  return (
    <div tabIndex={0} onKeyDown={move} className={`bat-left`} style={{transform:`translateY(${position}px)`}}></div>
  )
}
