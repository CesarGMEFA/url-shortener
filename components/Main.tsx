import { useState, useEffect, useContext, SetStateAction } from 'react'

import { item } from '../utils/interface/item.interface'

import { supabase } from '../utils/supabaseClient'
import { DataContext } from '../utils/hooks/appContext'

import Layout from '../Layout/Layout'

import Item from '../components/Item'
import FormCreate from '../components/FormCreate'

import styles from '../styles/components/Main.module.scss'

const initialState: item = {
  url: "",
  shortUrl: ""
}

const Main = () => {
  const [Url, setUrl] = useState(initialState)
  const [user, setUser]: SetStateAction<any> = useState(null)
  const { setLink, link }: any = useContext(DataContext)

  function notRepeat() {
    return link.some( ({shortUrl}:item) => shortUrl == Url.shortUrl)
  }

  function handleChangeURL(e: { target: { value: string } }) {
    setUrl({...Url, url: e.target.value})
  }
  function handleChangeURLshort(e: { target: { value: string } }) {
    setUrl({...Url, shortUrl: e.target.value})
  }

  
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (Url.url === "" || Url.shortUrl === "" || /\s/gi.test(Url.url) || /\s/gi.test(Url.shortUrl)) {
      return
    }
    // console.log(Url)
    if (!notRepeat()) {
      setLink([...link, {url: Url.url, shortUrl: Url.shortUrl, views: 0}]);
      localStorage.setItem("urls", JSON.stringify([...link, {url: Url.url, shortUrl: Url.shortUrl, views: "0"}]));
      setUrl({
        url: "",
        shortUrl: ""
      });

      (async() => {
        try {
          const { data: sending, error } = await supabase
            .from('link').insert([
              {url: Url.url, shortUrl: Url.shortUrl, user_id: user.id}
            ]);
          if (error) throw error;

        } catch (error) {
          if (error) {
            const e: any = error
            alert(e.message)
          }
        }
      })()
    }
  }

  useEffect(() => {
    // const u = supabase.auth.getUser()
    (async () => {
      const {data: {user}, error} = await supabase.auth.getUser()
      if(error) throw error
      setUser(user)
    })()
  }, [])

  useEffect(() => {
    setLink(link)
  },[link])

  useEffect(() => {
    if (link) {
      localStorage.setItem("urls", JSON.stringify(link))
    }
  }, [link])

  return (
    <Layout>
        <button className={styles.logout_box} onClick={async () => await supabase.auth.signOut()}>
          Cerrar sesi&oacute;n
        </button>
      <section className={styles.contain}>
        <h1>Shorten your URL</h1>
        <FormCreate 
          urlValue={Url}
          handleSubmit={handleSubmit}
          handleChangeURL={handleChangeURL}
          handleChangeURLshort={handleChangeURLshort} 
        />
        <section className={styles.boxItem}>
          { link == undefined ? <p>Create your link now</p> 
          :(
            link.map(( i: item) => (
              <Item 
                key={i.shortUrl}
                item={i}
              />
            ))
          )}
        </section>
      </section>
    </Layout>
  )
}

export default Main
