import { useRef, useReducer, useCallback } from "react"
import { writeCount } from "../util"

function reducer(count, action) {
  if (action === "increment") {
    writeCount("pull_up_notification", count + 1)
    return count + 1
  }
  if ("reset" && count > 1) {
    writeCount("pull_up", count)
    return 0
  }
  return 0
}

export default function(sensitivity = 10) {
  const [count, dispatch] = useReducer(reducer, 0)
  const standard = useRef(0)
  const checkPose = useCallback(
    ({
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist,
      leftHip,
      rightHip
    }) => {
      const elbow = leftElbow || rightElbow
      const shoulder = leftShoulder || rightShoulder
      if (!elbow || !shoulder) {
        return
      }

      const down = shoulder.y > elbow.y
      if (down) {
        standard.current = Math.max(standard.current, elbow.y)
        return
      }

      const up = standard.current > elbow.y + sensitivity
      if (up) {
        dispatch("increment")
        standard.current = 0
        return
      }

      const hip = leftHip || rightHip
      const wrist = leftWrist || rightWrist
      if (!hip || !wrist) {
        return
      }
      const rest = wrist.y + sensitivity > hip.y
      if (rest) {
        dispatch("reset")
      }
    },
    [sensitivity]
  )
  return [count, checkPose]
}
