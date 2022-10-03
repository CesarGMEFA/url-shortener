import { useState, useEffect, useRef, useContext, Fragment } from 'react'

import Auth from '../components/Auth'
import Main from '../components/Main'

import { supabase } from '../utils/supabaseClient'

import Layout from '../Layout/Layout'


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
