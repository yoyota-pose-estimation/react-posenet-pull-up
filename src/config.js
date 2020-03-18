export const modelConfig = {
  architecture: "ResNet50",
  quantBytes: 4,
  outputStride: 16
}

export const inferenceConfig = {
  decodingMethod: "single-person"
}
