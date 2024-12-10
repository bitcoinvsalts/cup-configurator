import type { GLTF } from 'three-stdlib'

import {
  MeshStandardMaterial,
  BufferGeometry,
  CanvasTexture,
  Texture,
  Group,
  Mesh,
} from 'three'
import { useTexture, useGLTF, Shadow } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useStore } from '@/lib/store'
import { useRef } from 'react'

type CupDrawAreaMesh = Mesh<BufferGeometry, MeshStandardMaterial>

const cupModelPath = '/models/40425-cs-stkr.gltf'
const baseTexturesPath = '/textures'

export default function Cup() {
  const { materials, nodes } = useGLTF(cupModelPath, true)
  const props = useTexture({
    displacementMap: `${baseTexturesPath}/displacement.jpg`,
    roughnessMap: `${baseTexturesPath}/roughness.jpg`,
    normalMap: `${baseTexturesPath}/normalDX.jpg`,
    map: `${baseTexturesPath}/color.jpg`,
  })

  const canvas = useStore(({ fabricCanvas }) => fabricCanvas)
  const texture = canvas && new CanvasTexture(canvas.lowerCanvasEl)

  const cupDrawAreaRef = useRef<CupDrawAreaMesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    // Prepare texture settings
    if (texture) {
      texture.flipY = false
      texture.anisotropy = 2
    }

    // Assign texture to the target material
    if (cupDrawAreaRef.current) {
      cupDrawAreaRef.current.material.map = texture
      ;(cupDrawAreaRef.current.material.map as Texture).needsUpdate = true
    }

    // Scale cup animation
    if (groupRef.current && groupRef.current.scale.x < 1) {
      groupRef.current.scale.x += 0.01
      groupRef.current.scale.y += 0.01
      groupRef.current.scale.z += 0.01
    }
  })

  return (
    <group {...props} dispose={null} ref={groupRef} scale={0}>
      {Object.values(nodes).map((node, index) => {
        if ((node as Mesh).isMesh) {
          const mesh = node as Mesh
          return (
            <mesh
              ref={mesh.name === 'In_Body_Center' ? cupDrawAreaRef : undefined}
              geometry={mesh.geometry}
              material={mesh.material}
              receiveShadow
              key={index}
              castShadow
            ></mesh>
          )
        }
        return null
      })}
    </group>
  )
}

useGLTF.preload(cupModelPath)
