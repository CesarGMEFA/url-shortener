import { useState, useEffect } from 'react'

import { item } from '../utils/interface/item.interface'
import { DataInterface } from '../utils/interface/DataArrayObject.interface'
import { supabase } from '../utils/supabaseClient'

import Layout from '../Layout/Layout'

import Item from '../components/Item'
import FormCreate from '../components/FormCreate'

import styles from '../styles/Home.module.scss'

const initialState: item = {
  url: "",
  shortUrl: "",
  views: ""
}

const Home = ({data}: DataInterface) => {
  const [link, setLink] = useState(data)

  const [Url, setUrl] = useState(initialState)

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
      setLink([...link, {url: Url.url, shortUrl: Url.shortUrl, views: "0"}]);
      console.log(link);
      setUrl({url: "", shortUrl: ""});
      localStorage.setItem("urls", JSON.stringify([...link, {url: Url.url, shortUrl: Url.shortUrl, views: "0"}]));

      // (async() => {
      //   try {
      //     const { data: sending, error } = await supabase
      //       .from('link').insert([{url: Url.url, shortUrl: Url.shortUrl}]);
      //     if (error) throw error;
      //     console.log('sending', sending)
      //   } catch (error) {
      //     alert(error)
      //   }
      // })()
    }
  }

  useEffect(() => {

    console.log(data)
  }, [])

  return (
    <Layout>
      <section className={styles.contain}>
        <h1>Shorten your URL</h1>
        <FormCreate 
          handleSubmit={handleSubmit}
          handleChangeURL={handleChangeURL}
          handleChangeURLshort={handleChangeURLshort} 
        />
        <section className={styles.boxItem}>
          <Item url={"https://www.google.com"} shortUrl={"goog"} views={"2"} />
          {link.map(({ url, shortUrl, views }: item) => (
            <Item key={shortUrl} url={url} shortUrl={shortUrl} views={views} />
          ))}
        </section>
      </section>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const { data, error } = await supabase
    .from('link')
    .select('url,shortUrl,views')
  if (error) throw error

  return {
    props: {
      data
    }
  }
}