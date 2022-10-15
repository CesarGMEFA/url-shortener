import { createContext,
  useEffect,
  useState,
  SetStateAction
} from "react";

import { item } from "../interface/item.interface";
import { getLinksData } from "../data/getLinksData";

import { supabase } from "../supabaseClient";

export const DataContext = createContext({})

export function useRendering() {
  const [link, setLink]: SetStateAction<any> = useState(null)
  
  useEffect(() => {
    (async() => {
      const d: ({ url: any; } & { shortUrl: any; } & { views: any; })[] | null = await getLinksData()
      setLink(d);
    })()
  }, [])

  async function deleteUrl(shortUrl: string) {
    try {
      const urls = localStorage.getItem("urls")
      if (urls) {
        const urlsData = JSON.parse(urls)
        const urlsFiltered = urlsData.filter( (e:item) => e.shortUrl !== shortUrl)
        localStorage.setItem("urls", JSON.stringify(urlsFiltered))
        setLink(urlsFiltered)
      }
      const { data, error: e } = await supabase
        .from('link')
        .delete()
        .eq('shortUrl', shortUrl)
      if (e) throw  e

    } catch(error) {
      alert(error)
    }
  }

  
  
  return {
    link,
    setLink,
    deleteUrl
  }
}