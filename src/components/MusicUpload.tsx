'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface MusicUploadProps {
  onUploadComplete?: () => void;
}

export default function MusicUpload({ onUploadComplete }: MusicUploadProps) {
  const [uploading, setUploading] = useState(false)

  const uploadMusic = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('music')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUploadComplete?.()
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="audio/mpeg"
        onChange={uploadMusic}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  )
} 