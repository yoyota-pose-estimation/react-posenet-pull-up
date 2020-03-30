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

export default function(sensitivity = 220) {
  const [count, dispatch] = useReducer(reducer, 0)
  const upRef = useRef(0)
  const checkPoses = useCallback(
    ({
      leftWrist,
      rightWrist,
      leftAnkle,
      rightAnkle,
      leftShoulder,
      rightShoulder,
      leftHip,
      rightHip
    }) => {
      const ankle = leftAnkle || rightAnkle
      const shoulder = leftShoulder || rightShoulder
      if (!ankle || !shoulder) {
        return
      }
      const distance = Math.abs(ankle.y - shoulder.y)
      if (distance < sensitivity) {
        upRef.current += 1
        return
      }
      if (upRef.current > 10) {
        dispatch("increment")
        upRef.current = 0
        return
      }
      const hip = leftHip || rightHip
      const wrist = leftWrist || rightWrist
      if (!hip || !wrist) {
        return
      }
      const rest = wrist.y + sensitivity / 10 > hip.y
      if (rest) {
        dispatch("reset")
      }
    },
    [sensitivity]
  )
  return [count, checkPoses]
}
