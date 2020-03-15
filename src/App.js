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
  const [count, onEstimate] = useOnEstimate()

  return (
    <>
      <LocalStorageInput label="InfluxDB URL" />
      <LocalStorageInput label="CAM URL" />
      {Object.keys(count).map(key => {
        return (
          <h1 key={key}>
            {key}: {count[key]}
          </h1>
        )
      })}

      <PoseNet
        input={input}
        className="min-vh-100"
        facingMode="environment"
        frameRate={30}
        onEstimate={onEstimate}
        modelConfig={modelConfig}
        inferenceConfig={inferenceConfig}
      />
    </>
  )
}

export default App
