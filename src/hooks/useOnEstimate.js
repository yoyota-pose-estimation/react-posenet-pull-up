import { useCallback } from "react"
import usePullUpCounter from "./usePullUpCounter"
import useHangingLegRaiseCounter from "./useHangingLegRaiseCounter"

function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position
    return acc
  }, {})
}

export default function useOnEstimate() {
  const [pullUpCount, checkPullUpPose] = usePullUpCounter()
  const [legRaiseCount, checkLegRaisePose] = useHangingLegRaiseCounter()
  const onEstimate = useCallback(
    poses => {
      if (poses.length !== 1) {
        return
      }
      const keyPointObject = getKeypointsObject(poses[0])
      checkPullUpPose(keyPointObject)
      checkLegRaisePose(keyPointObject)
    },
    [checkLegRaisePose, checkPullUpPose]
  )
  return [{ pullUpCount, legRaiseCount }, onEstimate]
}
