import { useRef, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'

import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

export const RotatingCamera = ({
  speed = 0.003,
  minFov = 30,
  maxFov = 60,
  radius = 80,
}) => {
  const [angle, setAngle] = useState(() => MathUtils.randInt(0, radius))
  const [fov, setFov] = useState(() => MathUtils.randInt(minFov, maxFov))

  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame((state, delta) => {
    if (cameraRef.current) {
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI))

      cameraRef.current.position.x = radius * Math.sin(angle)
      cameraRef.current.position.z = radius * Math.cos(angle)
      cameraRef.current.position.y = 200
      cameraRef.current.lookAt(1, 0, 1)

      const amplitude = (maxFov - minFov) / 2
      const oscillationSpeed = 0.05
      setFov(
        minFov +
          amplitude +
          Math.sin(state.clock.elapsedTime * oscillationSpeed) * amplitude,
      )
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={[0, 100, 0]}
      />
    </>
  )
}

// this component is used to create a rotating camera that orbits around a point in 3D space.
// It uses the useFrame hook to update the camera's position and field of view over time.
// The camera rotates around a point defined by the radius and angle, and the field of view oscillates between minFov and maxFov.
// The camera's position is updated based on the sine and cosine of the angle, creating a circular motion.
// The camera looks at a fixed point in space, which is defined by the lookAt method.
