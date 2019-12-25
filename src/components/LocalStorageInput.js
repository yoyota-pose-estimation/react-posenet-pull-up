import React from "react"
import slugify from "slugify"
import Input from "./Input"
import useLocalStorage from "../hooks/useLocalStorage"

export default function({ label }) {
  const [value, onChange] = useLocalStorage(slugify(label, { lower: true }))
  return <Input label={label} value={value} onChange={onChange} />
}
