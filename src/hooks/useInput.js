import { useMemo } from "react"

export default function useInput(videoElement) {
  const input = useMemo(() => {
    const camURL = localStorage.getItem("cam-url")
    if (camURL) {
      const image = new Image()
      image.src = camURL
      image.crossOrigin = ""
      return image
    }
    if (videoElement) {
      return videoElement
    }
    return undefined
  }, [videoElement])
  return input
}
