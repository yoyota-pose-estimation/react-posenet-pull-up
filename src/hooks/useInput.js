import { useMemo } from "react"

export default function useInput() {
  const input = useMemo(() => {
    const camURL = localStorage.getItem("cam-url")
    if (!camURL) return undefined
    const image = new Image()
    image.src = camURL
    image.crossOrigin = ""
    return image
  }, [])
  return input
}
