import React, { useRef } from "react"
import { Button } from "react-bootstrap"

async function startCapture({ setCaptureInput, videoRef }) {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia()
    const video = videoRef.current
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
      setCaptureInput(video)
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${err}`)
  }
}

export default function({ setCaptureInput, width = 600, height = 500 }) {
  const videoRef = useRef()
  return (
    <>
      <video
        playsInline
        ref={videoRef}
        style={{ width: "0", height: "0" }}
        width={width}
        height={height}
      />
      <div>
        <Button onClick={() => startCapture({ setCaptureInput, videoRef })}>
          Use screen display
        </Button>
      </div>
    </>
  )
}
