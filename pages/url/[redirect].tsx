import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router";

import { item } from "../../utils/interface/item.interface";

import { supabase } from "../../utils/supabaseClient";
import { DataContext } from "../../utils/hooks/appContext";

import LoaderPage from "../../components/LoaderPage";

export default function Redirect() {
  const [item, setItem]: any = useState(null)
  const { setLink }: any = useContext(DataContext)
  const router = useRouter()
  const { redirect } = router.query

  async function postViews(item: item) {
    try {
      const { data, error: e } = await supabase
        .from('link')
        .update({ views: item.views })
        .eq('shortUrl', item.shortUrl)
      if (e) throw e
    } catch(error) {
      alert(error)
    }
  }
  
  useEffect(() => {
  const data = localStorage.getItem("urls");
  
  if (data) {
    const urlsData: item[] = JSON.parse(data);
    
    const itemUrl = urlsData.find( (e: item) => e.shortUrl === redirect)

    if (itemUrl) {
      if (itemUrl.views) itemUrl.views++
      localStorage.setItem("urls", JSON.stringify(itemUrl))
      setLink(itemUrl)
      setItem(itemUrl)
      postViews(itemUrl);
      setTimeout(() => {
        window.location.href = itemUrl.url
      }, 2000)
    } else {
      setItem(undefined);
    }
  } else {
    setItem(undefined);
  };
}, [redirect])

  return <LoaderPage item={item} id={redirect} />
}