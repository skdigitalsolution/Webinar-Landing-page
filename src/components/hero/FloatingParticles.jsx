import { useMemo } from 'react'

export default function FloatingParticles({ count }) {
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    // Deterministic points avoid random geometry changes during React rerenders.
    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996
      const radius = 2.9 + (i % 7) * .14
      array[i * 3] = Math.cos(angle) * radius
      array[i * 3 + 1] = Math.sin(angle) * radius * .85
      array[i * 3 + 2] = Math.sin(i * 1.7) * 1.2 - 1
    }
    return array
  }, [count])
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#B69AFF" size={.018} transparent opacity={.6} sizeAttenuation depthWrite={false} /></points>
}
