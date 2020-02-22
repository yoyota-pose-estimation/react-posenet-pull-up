import "regenerator-runtime/runtime"
import React, { useCallback, useEffect, useMemo } from "react"
import PoseNet from "@react-posenet/time"
import usePullUpCounter from "./usePullUpCounter"
import LocalStorageInput from "./components/LocalStorageInput"

const modelConfig = {
  architecture: "ResNet50",
  quantBytes: 4
}

const inferenceConfig = {
  decodingMethod: "single-person"
}

function App() {
  const [count, checkPoses] = usePullUpCounter()
  const onEstimate = useCallback(poses => checkPoses(poses), [checkPoses])

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
      <h1>{`Pull up count: ${count}`}</h1>
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
