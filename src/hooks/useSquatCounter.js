import { useRef, useReducer, useCallback } from "react"
import { writeCount } from "../util"

function reducer(count, action) {
  if (action === "increment") {
    writeCount("squat_notification", count + 1)
    return count + 1
  }
  if ("reset" && count > 1) {
    writeCount("squat", count)
    return 0
  }
  return 0
}

export default function(sensitivity = 30) {
  const [count, dispatch] = useReducer(reducer, 0)
  const downRef = useRef(0)
  const checkPoses = useCallback(
    ({ leftEar, rightEar, leftKnee, rightKnee, leftHip, rightHip }) => {
      const hip = leftHip || rightHip
      const knee = leftKnee || rightKnee
      if (!hip || !knee) {
        return
      }
      const distance = Math.abs(hip.y - knee.y)
      if (distance < sensitivity) {
        downRef.current += 1
        return
      }
      if (downRef.current > 5) {
        dispatch("increment")
        downRef.current = 0
        return
      }
      const rest = leftEar && rightEar
      if (rest) {
        dispatch("reset")
      }
    },
    [sensitivity]
  )
  return [count, checkPoses]
}
