import { FLOOR_HEIGHT } from '../util/constants'
import { Square, SquareProps } from './Square'

interface BuildingProps extends SquareProps {
  floors?: number
}

export const Building = ({ position, size, floors = 3 }: BuildingProps) => {
  return (
    <>
      {Array.from({ length: floors }, (_, index) => (
        <Square
          key={index}
          position={[
            position[0],
            position[1] + index * FLOOR_HEIGHT,
            position[2],
          ]}
          size={size}
          borderColor="white"
        />
      ))}
    </>
  )
}

// this component is used to render a building in a 3D scene.
// It creates a series of squares stacked vertically to represent the floors of the building.
// The number of floors is determined by the `floors` prop, which defaults to 3.
// Each square is positioned based on the `position` prop and the `FLOOR_HEIGHT` constant.