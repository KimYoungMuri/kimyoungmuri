'use client'

import { useState, Suspense, useRef, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ url, isInteracting, onPositionUpdate }: { 
  url: string; 
  isInteracting: boolean;
  onPositionUpdate: (position: number[], lookAt: number[]) => void;
}) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>()
  const { camera } = useThree()
  // const centerPoint = new THREE.Vector3(3, 1, -1) // Center of the 4 desks
  // const rotationRadius = 15 // Fixed radius for auto-rotation
  // const cameraRig = useRef<THREE.Group>()
  // const isRotating = useRef(false)
  // const isZooming = useRef(false)
  // const isZoomingOut = useRef(false)
  // const rotationStartTime = useRef(0)
  // const zoomStartTime = useRef(0)
  // const zoomOutStartTime = useRef(0)
  // const isInDefaultState = useRef(false)
  // const targetRotationAngle = useRef(0)

  // Initialize camera rig
  /*
  useEffect(() => {
    if (!cameraRig.current) {
      const rig = new THREE.Group()
      rig.position.copy(centerPoint)
      scene.add(rig)
      cameraRig.current = rig
      
      // Position camera relative to rig
      camera.position.set(rotationRadius, 2, 0)
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      rig.add(camera)
    }
  }, [scene])
  */

  /*
  useEffect(() => {
    if (isInteracting && cameraRig.current) {
      // Calculate target angle based on cursor position
      targetRotationAngle.current = Math.atan2(
        camera.position.z - centerPoint.z,
        camera.position.x - centerPoint.x
      )
      isInDefaultState.current = false
      
      // Start with instant rotation to target
      cameraRig.current.rotation.y = -targetRotationAngle.current
    }
  }, [isInteracting])
  */

  /*
  useFrame((state) => {
    if (!isInteracting && cameraRig.current) {
      if (!isInDefaultState.current) {
        isInDefaultState.current = true
      }

      // Continuous auto-rotation of the rig
      cameraRig.current.rotation.y -= 0.001 // Slower rotation speed
    }
    
    // Update position every frame with the current lookAt point
    onPositionUpdate(
      [camera.position.x, camera.position.y, camera.position.z],
      [centerPoint.x, centerPoint.y, centerPoint.z]
    )
  })
  */

  // Basic position update for debugging
  useFrame(() => {
    onPositionUpdate(
      [camera.position.x, camera.position.y, camera.position.z],
      [0, 0, 0]
    )
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={2.5} 
      position={[0, -1, 0]} 
      rotation={[0, Math.PI / 4, 0]} 
    />
  )
}

// Simplified camera controller
function CameraController({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree()
  /*
  const lastMouseActivity = useRef(Date.now())
  
  useFrame(() => {
    const now = Date.now()
    const timeSinceLastMove = now - lastMouseActivity.current
    
    if (mousePosition.x !== 0.5 || mousePosition.y !== 0.5) {
      lastMouseActivity.current = now
    }
  })
  */
  return null
}

interface ModelViewerProps {
  modelUrl: string
  className?: string
  mousePosition: { x: number; y: number }
}

export default function ModelViewer({ modelUrl, className = '', mousePosition }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  /*
  const [isInteracting, setIsInteracting] = useState(false)
  const [debugInfo, setDebugInfo] = useState({ position: [0, 0, 0], lookAt: [0, 0, 0] })

  const handlePositionUpdate = useCallback((position: number[], lookAt: number[]) => {
    setDebugInfo({ position, lookAt })
  }, [])

  useEffect(() => {
    if (mousePosition.x !== 0.5 || mousePosition.y !== 0.5) {
      setIsInteracting(true)
      const timer = setTimeout(() => {
        setIsInteracting(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [mousePosition])
  */

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        onCreated={() => setIsLoading(false)}
        className="w-full h-full"
      >
        <color attach="background" args={['#ffffff']} />
        <fog attach="fog" args={['#ffffff', 12, 35]} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.6} />
          
          {/* Commented out 3D model */}
          {/* <Model url={modelUrl} isInteracting={isInteracting} onPositionUpdate={handlePositionUpdate} /> */}
          <CameraController mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  )
} 