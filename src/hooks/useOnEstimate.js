import { useCallback } from "react"
import usePullUpCounter from "./usePullUpCounter"

function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position
    return acc
  }, {})
}

export default function useOnEstimate() {
  const [pullUpCount, checkPullUpPoses] = usePullUpCounter()
  const onEstimate = useCallback(
    poses => {
      if (poses.length !== 1) {
        return
      }
      const keyPointObject = getKeypointsObject(poses[0])
      checkPullUpPoses(keyPointObject)
    },
    [checkPullUpPoses]
  )
  return [{ pullUpCount }, onEstimate]
}
