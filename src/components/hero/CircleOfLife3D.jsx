import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdditiveBlending } from 'three'
import { AdaptiveDpr } from '@react-three/drei'
import OrbitalRing from './OrbitalRing.jsx'
import FloatingParticles from './FloatingParticles.jsx'
import { dimensions } from '../../data/dimensions.js'

function Scene({ activeDimension, onSelect, animate, compact, dimensionData, enhanced }) {
  const group = useRef()
  const core = useRef()
  const elapsed = useRef(0)
  useFrame((state, delta) => {
    if (!animate) return
    elapsed.current += Math.min(delta, .05)
    const time = elapsed.current
    group.current.rotation.y += (state.pointer.x * .12 - group.current.rotation.y) * .035
    group.current.rotation.x += (-state.pointer.y * .08 - group.current.rotation.x) * .035
    group.current.position.y = Math.sin(time * .45) * .055
    core.current.rotation.y = time * .055
    core.current.rotation.z = time * .025
    if (enhanced) {
      const angle = activeDimension * Math.PI / 2
      const ease = 1 - Math.exp(-Math.min(delta, .05) * 2.5)
      state.camera.position.x += (Math.cos(angle) * .22 - state.camera.position.x) * ease
      state.camera.position.y += (Math.sin(angle) * .16 - state.camera.position.y) * ease
      state.camera.position.z += (8.15 - state.camera.position.z) * ease
      state.camera.lookAt(0, 0, 0)
    }
  })
  return <>
    <ambientLight intensity={.65} />
    <pointLight position={[-3, 2, 3]} color="#8855FF" intensity={20} />
    <pointLight position={[3, -1, 2]} color="#38DDF5" intensity={12} />
    <pointLight position={[0, 3, 1]} color="#D6B46A" intensity={5} />
    <group ref={group}>
      <mesh scale={[4.5, 4.5, 1]} position={[0, 0, -1.5]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial transparent depthWrite={false} blending={AdditiveBlending}
          vertexShader="varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"
          fragmentShader="varying vec2 vUv; void main(){float d=length(vUv-0.5); float a=exp(-d*d*24.0)*0.15; gl_FragColor=vec4(0.29,0.15,0.7,a);}" />
      </mesh>
      <group ref={core}>
        <mesh><sphereGeometry args={[.8, 40, 32]} /><meshStandardMaterial color="#171337" emissive="#4F258A" emissiveIntensity={.7} metalness={.65} roughness={.28} /></mesh>
        <mesh><icosahedronGeometry args={[.82, 2]} /><meshBasicMaterial wireframe color="#B59AFF" transparent opacity={.36} /></mesh>
        <mesh><sphereGeometry args={[.85, 24, 16]} /><meshBasicMaterial wireframe color="#38DDF5" transparent opacity={.055} /></mesh>
        <mesh><sphereGeometry args={[.9, 24, 20]} /><shaderMaterial transparent depthWrite={false} blending={AdditiveBlending}
          vertexShader="varying vec3 vNormal; varying vec3 vView; void main(){vec4 mv=modelViewMatrix*vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vView=normalize(-mv.xyz); gl_Position=projectionMatrix*mv;}"
          fragmentShader="varying vec3 vNormal; varying vec3 vView; void main(){float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vView)),0.0),2.5); gl_FragColor=vec4(0.45,0.27,1.0,rim*0.65);}" /></mesh>
      </group>
      {dimensionData.map((dimension, index) => <OrbitalRing key={dimension.id} index={index} radius={1.55 + index * .24} tilt={[[.8, .25, -.3], [1.1, -.6, .6], [.45, .9, -.5], [1.25, .3, -.7]][index]} color={dimension.color} selected={activeDimension === index} onSelect={onSelect} animate={animate} pulse={enhanced} />)}
      <FloatingParticles count={compact ? 24 : 65} />
    </group>
  </>
}

export default function CircleOfLife3D({ activeDimension, onSelect, animate, compact, onReady, onFailure, dimensionData = dimensions, enhanced = false }) {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const lost = event => { event.preventDefault(); onFailure() }
    canvas?.addEventListener('webglcontextlost', lost)
    return () => canvas?.removeEventListener('webglcontextlost', lost)
  }, [onFailure])
  return <Canvas ref={canvasRef} camera={{ position: [0, 0, 8.5], fov: 43 }} dpr={compact ? 1 : [1, 1.5]} frameloop={animate ? 'always' : 'demand'} gl={{ antialias: !compact, alpha: true, powerPreference: 'low-power' }} onCreated={() => onReady()} fallback={<span className="sr-only">3D unavailable. Use the dimension controls below.</span>} aria-hidden="true">
    {enhanced && <AdaptiveDpr />}
    <Scene activeDimension={activeDimension} onSelect={onSelect} animate={animate} compact={compact} dimensionData={dimensionData} enhanced={enhanced} />
  </Canvas>
}
