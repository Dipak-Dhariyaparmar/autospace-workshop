import { yellowColor } from '../util/constants'
import { Square, SquareProps } from './Square'
import { useEffect, useState } from 'react'

interface BlinkingParkingSlotProps extends SquareProps {
  blinkDuration?: number
}

export const BlinkingParkingSlot = ({
  borderColor = yellowColor,
  blinkDuration = 1000,
  ...props
}: BlinkingParkingSlotProps) => {
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevState) => !prevState)
    }, blinkDuration)

    return () => {
      clearInterval(interval)
    }
  }, [blinkDuration])

  if (isBlinking) return null

  return <Square {...props} borderColor={borderColor} />
}

// this component is used to create a blinking parking slot in a 3D scene.
// It uses the useState and useEffect hooks to manage the blinking state.
// The blinking effect is achieved by toggling the visibility of the Square component at a specified interval (blinkDuration).
// The border color of the Square can be customized, with a default value of yellowColor.
// The component returns null when it is in the blinking state, effectively hiding the Square.