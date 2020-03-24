import "regenerator-runtime/runtime"
import React, { useState } from "react"
import PoseNet from "react-posenet"
import { modelConfig, inferenceConfig } from "./config"
import LocalStorageInput from "./components/LocalStorageInput"
import ScreenCapture from "./components/ScreenCapture"
import Count from "./components/Count"
import useInput from "./hooks/useInput"
// import useReloadWhenError from "./hooks/useReloadWhenError"
import useOnEstimate from "./hooks/useOnEstimate"

function App() {
  // useReloadWhenError()
  const [captureInput, setCaptureInput] = useState()
  const input = useInput(captureInput)
  const [count, onEstimate] = useOnEstimate()

  return (
    <>
      <div className="d-flex">
        <PoseNet
          input={input}
          className="min-vh-100"
          facingMode="environment"
          frameRate={30}
          onEstimate={onEstimate}
          minPartConfidence={0.75}
          modelConfig={modelConfig}
          inferenceConfig={inferenceConfig}
        />
        <Count count={count} />
      </div>
      <ScreenCapture setCaptureInput={setCaptureInput} />
      <div className="my-3" />
      <LocalStorageInput label="InfluxDB URL" />
      <LocalStorageInput label="CAM URL" />
    </>
  )
}

export default App
