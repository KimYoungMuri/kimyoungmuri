import { supabase } from './supabase'

export async function upload3DModel(file: File) {
  try {
    const fileName = `models/${Date.now()}_${file.name}`

    const { data, error } = await supabase.storage
      .from('models')
      .upload(fileName, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('models')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error uploading 3D model:', error)
    throw error
  }
} 