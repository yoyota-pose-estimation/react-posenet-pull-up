import "regenerator-runtime/runtime"
import React, { useCallback, useEffect, useMemo } from "react"
import PoseNet from "@react-posenet/time"
import usePullUpCounter from "./hooks/usePullUpCounter"
import LocalStorageInput from "./components/LocalStorageInput"

const modelConfig = {
  architecture: "ResNet50",
  quantBytes: 4
}

const inferenceConfig = {
  decodingMethod: "single-person"
}

function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position
    return acc
  }, {})
}

function App() {
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

  useEffect(() => {
    const id = setInterval(() => {
      const fonts = document.getElementsByTagName("font")
      const errorMessage = Array.from(fonts).some(
        ({ innerText }) => innerText !== ""
      )
      if (errorMessage) window.location.reload()
    }, 1000 * 60)
    return () => clearInterval(id)
  }, [])

  const input = useMemo(() => {
    const camURL = localStorage.getItem("cam-url")
    if (!camURL) return undefined
    const image = new Image()
    image.src = camURL
    image.crossOrigin = ""
    return image
  }, [])

  return (
    <>
      <LocalStorageInput label="InfluxDB URL" />
      <LocalStorageInput label="CAM URL" />
      <h1>{`Pull up count: ${pullUpCount}`}</h1>
      <PoseNet
        className="min-vh-100"
        facingMode="environment"
        inferenceConfig={inferenceConfig}
        input={input}
        modelConfig={modelConfig}
        onEstimate={onEstimate}
      />
    </>
  )
}

export default App
