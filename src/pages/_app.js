import '@/styles/globals.css'
import '@/styles/table.css'
import '@/styles/bat.css'
import '@/styles/ball.css'

import Table from '../components/Table'
import { useEffect, useState } from 'react'



export default function App() {

  const [score, setScore] = useState({ p1: 0, p2: 0 })
  const [position, setPosition] = useState({ x: 350, y: 175 })
  const [increaseY, setIncreaseY] = useState(null)
  const [increaseX, setIncreaseX] = useState(null)
  const [padR, setPadR] = useState(0)
  const [padL, setPadL] = useState(140)
  const [pass, setPass] = useState(0)
  const [turn, setTurn] = useState(true)

  const MAX_X_BALL_POSITION = 700;
  const MIN_X_BALL_POSITION = -20;
  const MAX_Y_BALL_POSITION = 326;
  const MIN_Y_BALL_POSITION = 0;
  const PAD_SIZE = 70;
  const PAD_SPEED = 10;
  const BALL_SPEED = 160;

  const rules = {
    _moveY: (position) => {
      if (position === MAX_Y_BALL_POSITION) {
        setIncreaseY(false)
      } else if (position === MIN_Y_BALL_POSITION) {
        setIncreaseY(true)
      }
    },
    _moveX: (positionX, positionY) => {
      if (positionX === MAX_X_BALL_POSITION || (positionX === MAX_X_BALL_POSITION - 30 && (positionY + 22) >= padR && positionY <= padR + PAD_SIZE)) {
        setIncreaseX(false)
      } else if (positionX === MIN_X_BALL_POSITION || (positionX === MIN_X_BALL_POSITION + 30 && (positionY + 22) >= padL && positionY <= padL + PAD_SIZE)) {
        setIncreaseX(true)
      }
    },
    _movePadL: (event) => {
      if (event?.key === "ArrowUp" && padL > MIN_Y_BALL_POSITION) {
        setPadL(padL - PAD_SPEED)
      } else if (event?.key === "ArrowDown" && (padL + PAD_SIZE) < 350) {
        setPadL(padL + PAD_SPEED)
      }
    },
    _movePadR: () => {
      if (pass === 0) {
        setTurn(true)
      } else if (pass === 280) {
        setTurn(false)
      }

      turn ? setPass(pass + 1) : setPass(pass - 1)
      setPadR(pass)
    },
    _makePoints: () => {
      if (position.x === MIN_X_BALL_POSITION) {
        setScore({ ...score, p2: score.p2 + 1 })
        setPosition({ x: 350, y: parseInt(Math.random() * 330) })
      } else if (position.x === MAX_X_BALL_POSITION) {
        setScore({ ...score, p1: score.p1 + 1 })
        setPosition({ x: 350, y: parseInt(Math.random() * 330) })
      }
    },
    _ballMovimentation: () => {
      setPosition({ x: increaseX ? position.x + 1 : position.x - 1, y: increaseY ? position.y + 1 : position.y - 1 })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      rules._moveY(position.y)
      rules._moveX(position.x, position.y)
      rules._movePadR()
      rules._ballMovimentation()
      rules._makePoints()


    }, 1000 / (BALL_SPEED + 100));
    return () => clearInterval(interval);
  }, [position, increaseY, increaseX]);

  return <>
    <audio className='audio' autoPlay loop controls src="somzim.mp3"></audio>
    <Table ballPosition={position} score={score} padR={padR} padL={padL} move={rules._movePadL} moveR={rules._movePadR} />
  </>
}
