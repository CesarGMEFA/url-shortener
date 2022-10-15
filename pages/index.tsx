import { useState, useEffect, Fragment } from 'react'
import Head from 'next/head'

import Auth from '../components/Auth'
import Main from '../components/Main'

import { supabase } from '../utils/supabaseClient'



const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession]: any = useState(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { subscription }: any = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (
      <Fragment>
        <Head>
          <title>url shortener</title>
          <meta name='description' content='App to cut and sava in Supabase'/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {!session ? (
          <Auth />
        ) : (
          <Main key={session.user.id} />
        )}
      </Fragment>
    // <Layout>
    // </Layout>
  )
}

export default Home
