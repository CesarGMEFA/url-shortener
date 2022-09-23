import { supabase } from "../supabaseClient";

export async function getLinksData() {
  const { data, error } = await supabase
    .from('link')
    .select('url,shortUrl,views')
    
  if (error) throw error

  return data
}