import { supabase } from './supabase'

export async function uploadBlogImage(file: File, blogSlug: string) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${blogSlug}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('blog')
      .upload(fileName, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
} 