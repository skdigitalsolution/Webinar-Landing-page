import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function OrbitalRing({ radius, tilt, color, index, selected, onSelect, animate, pulse = false }) {
  const orbit = useRef()
  const node = useRef()
  const nodeMaterial = useRef()
  const elapsed = useRef(0)
  useFrame((_, delta) => {
    if (!animate) return
    orbit.current.rotation.z += Math.min(delta, .05) * (.055 + index * .012)
    const target = selected ? 1.35 : 1
    node.current.scale.lerp({ x: target, y: target, z: target }, .08)
    if (pulse) {
      elapsed.current += Math.min(delta, .05)
      nodeMaterial.current.emissiveIntensity = (selected ? 2.5 : 1.1) + Math.sin(elapsed.current * 1.1 + index) * .18
    }
  })
  return (
    <group rotation={tilt}>
      <group ref={orbit} rotation={[0, 0, index * 1.65 + .4]}>
        <mesh>
          <torusGeometry args={[radius, .012, 6, 100]} />
          <meshBasicMaterial color={color} transparent opacity={selected ? .95 : .4} />
        </mesh>
        <mesh rotation={[0, 0, .3]}>
          <torusGeometry args={[radius + .06, .004, 4, 100, Math.PI * 1.1]} />
          <meshBasicMaterial color={color} transparent opacity={.22} />
        </mesh>
        <group position={[radius, 0, 0]} ref={node} scale={selected ? 1.35 : 1}>
          <mesh onPointerOver={event => { event.stopPropagation(); onSelect(index) }} onClick={event => { event.stopPropagation(); onSelect(index) }}>
            <sphereGeometry args={[.145, 20, 16]} />
            <meshStandardMaterial ref={nodeMaterial} color={color} emissive={color} emissiveIntensity={selected ? 2.8 : 1.2} metalness={.4} roughness={.22} />
          </mesh>
          <mesh><sphereGeometry args={[.21, 16, 12]} /><meshBasicMaterial color={color} transparent opacity={.1} depthWrite={false} /></mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.25, .008, 5, 32]} /><meshBasicMaterial color={color} transparent opacity={.6} /></mesh>
        </group>
      </group>
    </group>
  )
}
