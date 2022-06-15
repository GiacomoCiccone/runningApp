export const clamp = (min, val, max) => Math.max(Math.min(max, val), min)
export const translateZ = (perspective, val) => (perspective / (perspective - val))
export const radiansToDeg = rad => (rad * 180) / Math.PI

