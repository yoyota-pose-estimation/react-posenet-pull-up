import { useRef, useReducer, useCallback } from "react"
import { writeCount } from "../util"

function reducer(count, action) {
  if (action === "increment") {
    writeCount("leg_raise_notification", count + 1)
    return count + 1
  }
  if ("reset" && count > 1) {
    writeCount("leg_raise", count)
    return 0
  }
  return 0
}

export default function(sensitivity = 70) {
  const [count, dispatch] = useReducer(reducer, 0)
  const upRef = useRef(false)
  const checkPoses = useCallback(
    ({ leftWrist, rightWrist, leftAnkle, rightAnkle, leftHip, rightHip }) => {
      const hip = leftHip || rightHip
      const ankle = leftAnkle || rightAnkle
      if (!hip || !ankle) {
        return
      }
      const distance = Math.abs(ankle.y - hip.y)
      if (distance < sensitivity) {
        upRef.current = true
        return
      }
      if (upRef.current) {
        dispatch("increment")
        upRef.current = false
        return
      }
      const wrist = leftWrist || rightWrist
      if (!wrist) {
        return
      }
      const rest = wrist.y + sensitivity > hip.y
      if (rest) {
        dispatch("reset")
      }
    },
    [sensitivity]
  )
  return [count, checkPoses]
}
