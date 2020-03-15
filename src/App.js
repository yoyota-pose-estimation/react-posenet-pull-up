import "regenerator-runtime/runtime"
import React from "react"
import PoseNet from "@react-posenet/time"
import { modelConfig, inferenceConfig } from "./config"
import LocalStorageInput from "./components/LocalStorageInput"
import useInput from "./hooks/useInput"
import useReloadWhenError from "./hooks/useReloadWhenError"
import useOnEstimate from "./hooks/useOnEstimate"

function App() {
  useReloadWhenError()
  const input = useInput()
  const [counts, onEstimate] = useOnEstimate()

  return (
    <>
      <LocalStorageInput label="InfluxDB URL" />
      <LocalStorageInput label="CAM URL" />
      <h1>{`Pull up count: ${counts.pullUpCount}`}</h1>
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
