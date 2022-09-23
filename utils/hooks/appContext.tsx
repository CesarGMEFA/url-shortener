import { useContext, createContext, useEffect, useRef, useState, SetStateAction } from "react";

import { getLinksData } from "../data/getLinksData";


export const DataContext = createContext({})

export function useRendering() {
  const [link, setLink]: SetStateAction<any> = useState(null)
  
  useEffect(() => {
    (async() => {
      const d: ({ url: any; } & { shortUrl: any; } & { views: any; })[] | null = await getLinksData()
      setLink(d);
    })()
    console.log("data context: ",link)
  }, [])
  
  return {
    link,
    setLink
  }
}