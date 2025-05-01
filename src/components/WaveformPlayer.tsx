'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface WaveformPlayerProps {
  url: string
  songName: string
  onError: (error: Error) => void
}

export default function WaveformPlayer({ url, songName, onError }: WaveformPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const cleanupFlag = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    cleanupFlag.current = false;

    if (!waveformRef.current) return;

    // Clear the container's content
    waveformRef.current.innerHTML = '';

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#8D8D8D',
      progressColor: '#FF5500',
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 1,
      height: 80,
      barRadius: 3,
      normalize: true,
      backend: 'WebAudio'
    })

    wavesurfer.current = ws

    const handleReady = () => {
      if (!cleanupFlag.current) {
      setDuration(ws.getDuration() || 0)
      }
    }

    const handleAudioProcess = () => {
      if (!cleanupFlag.current) {
      setCurrentTime(ws.getCurrentTime() || 0)
      }
    }

    const handleFinish = () => {
      if (!cleanupFlag.current) {
      setIsPlaying(false)
      ws.stop()
      }
    }

    const handleError = (err: Error) => {
      if (!cleanupFlag.current) {
      onError(err)
      }
    }

    ws.on('ready', handleReady)
    ws.on('audioprocess', handleAudioProcess)
    ws.on('finish', handleFinish)
    ws.on('error', handleError)

    ws.load(url)

    return () => {
      cleanupFlag.current = true;
      
      // Remove all event listeners first
      ws.un('ready', handleReady)
      ws.un('audioprocess', handleAudioProcess)
      ws.un('finish', handleFinish)
      ws.un('error', handleError)

      // Just stop playback and remove reference
      if (wavesurfer.current) {
        try {
          wavesurfer.current.stop()
          wavesurfer.current = null
        } catch (e) {
          console.warn('Cleanup warning:', e)
        }
      }
    }
  }, [url, onError])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (!wavesurfer.current || cleanupFlag.current) return
    if (isPlaying) {
      wavesurfer.current.pause()
    } else {
      wavesurfer.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{songName}</h3>
          <div className="text-sm text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
      <div ref={waveformRef} className="w-full rounded-lg overflow-hidden" />
    </div>
  )
} 