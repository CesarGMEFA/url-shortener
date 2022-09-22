import { useEffect, useState } from "react"
import { useRouter } from "next/router";

import { item } from "../../utils/interface/item.interface";

import LoaderPage from "../../components/LoaderPage";

export default function Redirect() {
  const [item, setItem]: any = useState(null)
  const router = useRouter()
  const { redirect } = router.query
  
  useEffect(() => {
    const data = localStorage.getItem("urls");
    
    if (data) {
      const urlsData = JSON.parse(data);
      
      const itemUrl = urlsData.find( (e: item) => e.shortUrl === redirect)

      if (itemUrl) {
        setItem(itemUrl)
        setTimeout(() => {
          window.location.href = itemUrl.url
        }, 2000)
      } else {
        setItem(undefined);
        console.log('urls', urlsData)
        console.log('redirect', redirect)
        console.log('itemUrl', itemUrl)
      }
    } else {
      setItem(undefined);
    };
  }, [redirect])

  return <LoaderPage item={item} id={redirect} />
}