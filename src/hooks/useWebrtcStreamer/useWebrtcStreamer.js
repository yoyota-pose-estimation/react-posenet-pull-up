/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useEffect } from "react"
import WebRtcStreamer from "./webrtcstreamer"

export default function Webrtc(videoRef) {
  const [videoElement, setVideoElement] = useState()
  useEffect(() => {
    const intervalID = setInterval(() => {
      const elem = document.getElementById("video")
      if (elem) {
        setVideoElement(elem)
        const server = new WebRtcStreamer("video", window.location.origin)
        server.connect("rtsp://192.168.2.12:8554/live.sdp")
        clearInterval(intervalID)
      }
    })
  }, [videoRef])
  // useEffect(() => {
  //   if (videoElement) {
  //     const server = new WebRtcStreamer(videoElement, window.location.origin)
  //     server.connect("rtsp://192.168.2.12:8554/live.sdp")
  //   }
  // }, [videoElement])
}
