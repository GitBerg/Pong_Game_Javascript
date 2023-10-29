import React from 'react'
import Bat from '../Player_Bat'
import Ball from '../Ball'
import BotBat from '../Bot_Bat'

export default function Table({ ballPosition, score, padR, padL, move, moveR }) {
  return (
    <div className='table'>
      <div className="score">
        <h1>{score.p1}</h1>
        <h1>{score.p2}</h1>
      </div>
      <Bat position={padL} move={move} />
      <Ball ballPosition={ballPosition} />
      <BotBat position={padR} move={moveR} />
    </div>
  )
}
