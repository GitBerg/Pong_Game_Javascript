import React from 'react'

export default function Ball({ballPosition}) {
  return (
    <div className='ball' style={{transform:`translate(${ballPosition.x}px, ${ballPosition.y}px)`}}></div>
  )
}