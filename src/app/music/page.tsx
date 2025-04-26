'use client'

import { useEffect, useState } from 'react'
import MusicUpload from '@/components/MusicUpload'
import { supabase } from '@/lib/supabase'

interface Song {
  name: string;
  url: string;
}

export default function Music() {
  const [songs, setSongs] = useState<Song[]>([]);

  const fetchSongs = async () => {
    const { data, error } = await supabase
      .storage
      .from('music')
      .list()

    if (error) {
      console.error('Error fetching songs:', error)
      return
    }

    if (data) {
      const songList = data.map(file => ({
        name: file.name.split('.')[0], // Remove file extension
        url: supabase.storage
          .from('music')
          .getPublicUrl(file.name).data.publicUrl
      }))
      setSongs(songList)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Music</h1>
        <MusicUpload onUploadComplete={() => fetchSongs()} />
        <div className="grid gap-6 mt-6">
          {songs.map((song, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{song.name}</h2>
              <audio controls className="w-full">
                <source src={song.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
  