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
      <div className="d-flex">
        <PoseNet
          input={input}
          facingMode="environment"
          frameRate={40}
          onEstimate={onEstimate}
          minPartConfidence={0.75}
          modelConfig={modelConfig}
          inferenceConfig={inferenceConfig}
        />
        <div>
          {Object.keys(count).map(key => {
            return (
              <h1 key={key}>
                {key}: {count[key]}
              </h1>
            )
          })}
        </div>
      </div>
      <LocalStorageInput label="InfluxDB URL" />
      <LocalStorageInput label="CAM URL" />
    </>
  )
}

export default App
