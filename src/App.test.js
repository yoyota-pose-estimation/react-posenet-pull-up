import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders CAM URL", () => {
  const { getByText } = render(<App />)
  const pullUp = getByText(/CAM URL/i)
  expect(pullUp).toBeInTheDocument()
})
