'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

interface ModelViewerProps {
  modelUrl: string
  className?: string
}

export default function ModelViewer({ modelUrl, className = '' }: ModelViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => setIsLoading(false)}
        className="w-full h-full min-h-[400px]"
      >
        <Suspense fallback={null}>
          {/* Basic lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} />
          
          <Model url={modelUrl} />
          
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={true}
            enablePan={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
} 