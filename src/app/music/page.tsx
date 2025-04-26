'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import WaveformPlayer from '@/components/WaveformPlayer'

interface Song {
  name: string;
  url: string;
  originalName: string;
}

export default function Music() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      // Test bucket access first
      const testAccess = await supabase.storage.from('music').list()
      console.log('Testing bucket access:', testAccess)

      if (testAccess.error) {
        setError(`Bucket access error: ${testAccess.error.message}`)
        return
      }

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

      console.log('Files found:', files);

      if (!files || files.length === 0) {
        setSongs([]);
        return;
      }

      // Get signed URLs for each file
      const songList = await Promise.all(
        files.map(async (file) => {
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
      setSongs(validSongs);

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
    console.error('Audio error:', error);
    setError(`Failed to load audio file. Please check storage permissions.`);
  };

  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Music</h1>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        <div className="grid gap-6">
          {loading ? (
            <p>Loading songs...</p>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-white">
                <WaveformPlayer
                  url={song.url}
                  songName={song.name}
                  onError={handleAudioError}
                />
              </div>
            ))
          ) : (
            <p>No songs found in the music bucket.</p>
          )}
        </div>
      </div>
    </main>
  );
}
  