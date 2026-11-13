import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color } from 'three'

const vertexShader = 'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}'
const haloShader = 'varying vec2 vUv; void main(){float d=length(vUv-.5);float ring=exp(-pow((d-.36)*36.,2.));gl_FragColor=vec4(.58,.19,1.,ring*.19);}'
const shadowShader = 'varying vec2 vUv; void main(){float d=length(vUv-.5);gl_FragColor=vec4(.015,.005,.04,exp(-d*d*19.)*.7);}'

// A shaded torus and emissive edges supply depth without bloom or shadow maps.
export default function HeroOrbit({ animate, compact, color }) {
  const orbit = useRef()
  const rim = useRef()
  const target = useRef(new Color(color))
  useFrame((_, delta) => {
    const step = Math.min(delta, .05)
    target.current.set(color)
    rim.current.color.lerp(target.current, 1 - Math.exp(-step * 4))
    if (animate) orbit.current.rotation.z += step * .075
  })
  return <group>
    <group position={[0, .35, -.2]} rotation={[.035, -.11, -.04]}>
      <mesh position={[0, 0, -.14]} scale={[7.4, 7.4, 1]}>
        <planeGeometry args={[1, 1]}/><shaderMaterial vertexShader={vertexShader} fragmentShader={haloShader} transparent depthWrite={false} blending={AdditiveBlending}/>
      </mesh>
      <mesh>
        <torusGeometry args={[2.58, .065, compact ? 6 : 10, compact ? 64 : 96]}/>
        <meshStandardMaterial color="#443166" metalness={.75} roughness={.27} emissive="#65258f" emissiveIntensity={.38}/>
      </mesh>
      <mesh position={[0, 0, .05]}>
        <torusGeometry args={[2.59, .018, 6, compact ? 80 : 112]}/>
        <meshBasicMaterial color="#efb5ff" toneMapped={false}/>
      </mesh>
      <mesh position={[0, 0, -.075]}>
        <torusGeometry args={[2.64, .01, 6, compact ? 64 : 96]}/>
        <meshBasicMaterial ref={rim} color={color} transparent opacity={.7} toneMapped={false}/>
      </mesh>
      <group ref={orbit}>
        {[0, Math.PI].map((angle, index) => <group key={angle} rotation={[0, 0, angle]}>
          <mesh position={[0, 0, .085]}><torusGeometry args={[2.59, .025, 6, 40, .5]}/><meshBasicMaterial color={index ? '#ffdc94' : '#a8f6ff'} toneMapped={false}/></mesh>
          <mesh position={[2.59, 0, .09]}><sphereGeometry args={[.045, 10, 8]}/><meshBasicMaterial color={index ? '#ffdc94' : '#d1fbff'} toneMapped={false}/></mesh>
        </group>)}
      </group>
    </group>
    <group position={[0, -2.2, .1]} rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh position={[0, 0, -.1]} scale={[3.9, 3.9, 1]}><planeGeometry args={[1, 1]}/><shaderMaterial vertexShader={vertexShader} fragmentShader={shadowShader} transparent depthWrite={false}/></mesh>
      <mesh><circleGeometry args={[1.25, compact ? 40 : 64]}/><meshStandardMaterial color="#242141" emissive="#163656" emissiveIntensity={.5} metalness={.6} roughness={.35}/></mesh>
      {[0, 1, 2].map(i => <mesh key={i} position={[0, 0, .05 + i * .035]}><torusGeometry args={[1.25 - i * .25, .014, 6, compact ? 48 : 72]}/><meshBasicMaterial color={i === 1 ? '#ec95ff' : '#57ddff'} toneMapped={false}/></mesh>)}
    </group>
  </group>
}
