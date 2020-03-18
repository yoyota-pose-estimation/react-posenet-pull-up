import { useEffect } from "react"

export default function useReloadWhenError() {
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
}
