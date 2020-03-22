import React, { useState, useEffect } from "react"
import { writeCount } from "../util"

let intervalID

export default function({ count = {} }) {
  const allZeroCount = Object.values(count).every(v => v === 0)
  const [startTime, setStartTime] = useState(new Date())
  const [elapsedTime, setElapsedTime] = useState()
  useEffect(() => {
    setStartTime(new Date())
    writeCount("elapsed", 1)
  }, [allZeroCount])
  useEffect(() => {
    clearInterval(intervalID)
    intervalID = setInterval(() => {
      const elapsed = Math.round((new Date() - startTime) / 1000)
      setElapsedTime(elapsed)
    }, 1000)
  }, [startTime])
  return (
    <div>
      {Object.keys(count).map(key => {
        return (
          <h1 key={key}>
            {key.replace("use", "").replace(/[A-Z]/g, match => {
              return ` ${match.toLowerCase()}`
            })}
            : {count[key]}
          </h1>
        )
      })}
      <h1>elapsed: {elapsedTime}</h1>
    </div>
  )
}
