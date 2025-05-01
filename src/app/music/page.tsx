'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import WaveformPlayer from '@/components/WaveformPlayer'
import Image from 'next/image'

interface Song {
  name: string;
  url: string;
  originalName: string;
}

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  const formatSongName = (fileName: string) => {
    // Remove file extension
    let name = fileName.replace('.mp3', '');
    
    // Replace underscores and hyphens with spaces
    name = name.replace(/[_-]/g, ' ');
    
    // Capitalize first letter of each word
    name = name.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return name;
  };

  const fetchSongs = async () => {
    try {
      setLoadingProgress(10);
      // Test bucket access first
      const testAccess = await supabase.storage.from('music').list()
      console.log('Testing bucket access:', testAccess)

      if (testAccess.error) {
        setError(`Bucket access error: ${testAccess.error.message}`)
        return
      }

      setLoadingProgress(30);
      // If we can access the bucket, try to get the files
      const { data: files, error: listError } = await supabase
        .storage
        .from('music')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (listError) {
        setError(`List error: ${listError.message}`);
        return;
      }

      setLoadingProgress(50);
      console.log('Files found:', files);

      if (!files || files.length === 0) {
        setSongs([]);
        return;
      }

      // Filter for MP3 files only
      const mp3Files = files.filter(file => file.name.toLowerCase().endsWith('.mp3'));
      
      setLoadingProgress(70);
      // Get signed URLs for each MP3 file
      const songList = await Promise.all(
        mp3Files.map(async (file) => {
          const { data, error: signedUrlError } = await supabase
            .storage
            .from('music')
            .createSignedUrl(file.name, 60 * 60); // 1 hour expiry

          if (signedUrlError || !data?.signedUrl) {
            console.error('Error getting signed URL:', signedUrlError);
            return null;
          }

          return {
            name: formatSongName(file.name),
            originalName: file.name,
            url: data.signedUrl
          };
        })
      );

      // Filter out any null values from failed signed URLs
      const validSongs = songList.filter((song): song is Song => song !== null);
      console.log('Generated song list:', validSongs);
      setLoadingProgress(90);
      setSongs(validSongs);
      setLoadingProgress(100);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Fetch error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleAudioError = (error: Error) => {
    console.warn('Audio loading warning:', error);
    // Only set error if playback is actually affected
    if (error.message.includes('Failed to load media') || error.message.includes('network error')) {
      setError(`Failed to load audio file. Please check your internet connection.`);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/sign/music/background.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0ODMwYzBmLWJkNWYtNDhlZS04ZGUzLTNkZGU3MGU4YWVhNyJ9.eyJ1cmwiOiJtdXNpYy9iYWNrZ3JvdW5kLmpwZyIsImlhdCI6MTc0NjA2MzE1NSwiZXhwIjo0ODk5NjYzMTU1fQ.kRZPSAh1766-FELuJ-LN2N6zGTD1sK3aYv64eGPt_1U"
          alt="Music Background"
          fill
          className="object-cover object-[20%_center]"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative pt-32 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-12 text-white">Music</h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          <div className="grid gap-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <p className="text-xl mb-4">Loading Songs...</p>
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300 rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-white/70">{loadingProgress}%</p>
              </div>
            ) : songs.length > 0 ? (
              songs.map((song: Song, index: number) => (
                <div key={song.originalName} className="p-6 rounded-lg hover:shadow-md transition-shadow bg-transparent text-white">
                  <WaveformPlayer
                    key={`${song.originalName}-${activePlayer === index}`}
                    url={song.url}
                    songName={song.name}
                    onError={handleAudioError}
                  />
                </div>
              ))
            ) : (
              <p className="text-white">No songs found in the music bucket.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  