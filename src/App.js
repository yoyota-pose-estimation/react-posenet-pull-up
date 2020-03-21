/* eslint-disable jsx-a11y/media-has-caption */
import "regenerator-runtime/runtime"
import React, { useRef } from "react"
import PoseNet from "react-posenet"
import { modelConfig, inferenceConfig } from "./config"
import LocalStorageInput from "./components/LocalStorageInput"
import useInput from "./hooks/useInput"
import useReloadWhenError from "./hooks/useReloadWhenError"
import useOnEstimate from "./hooks/useOnEstimate"
import useWebrtcStreamer from "./hooks/useWebrtcStreamer"

function App() {
  const videoRef = useRef()
  // const videoRef = useRef(document.createElement("video"))
  useWebrtcStreamer(videoRef)
  useReloadWhenError()
  const input = useInput()
  const [count, onEstimate] = useOnEstimate()

  return (
    <>
      <video id="video" ref={videoRef} />
      <video src="rtsp://192.168.2.12:8554/live.sdp" />
      <div className="d-flex">
        <PoseNet
          input={input}
          className="w-75"
          facingMode="environment"
          frameRate={50}
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
