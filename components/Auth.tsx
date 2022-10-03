import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'

import Layout from '../Layout/Layout'

import styles from "../styles/components/Auth.module.scss"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSingUp, setIsSingUp] = useState(false)

  const handleSingUp = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { user, session, error }: any = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      console.log("user: ", user)
      console.log("session: ", session)
    } catch(e: any) {
      alert(e.message)
    } finally {
      setEmail("")
      setPassword("")
      setLoading(false)
    }
  }

  const handleSingIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { user, session, error }: any = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      console.log("user: ", user)
      console.log("session: ", session)
    } catch(e: any) {
      alert(e.message)
    } finally {
      setEmail("")
      setPassword("")
      setLoading(false)
    }
  }

  function signInView() {
    return (
      <Layout>
        <section className={styles.auth_container}>
          <h1 className="header">Sing In</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="inputs"
              type="text"
              id="email"
              value={email}
              placeholder="email@address.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contrase&ntilde;a:</label>
            <input
              className="inputs"
              type="password"
              id="password"
              value={password}
              placeholder="password ******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleSingIn}
              className="button"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Iniciar'}</span>
            </button>
          </div>
          <p>
            {isSingUp ? "¿Ya tienes cuenta?" : "¿Eres nuevo?"}{" "}
            <a href='#' onClick={() => setIsSingUp(!isSingUp)}>
              {isSingUp ? "Incia sesión" : "Regístrate"}
            </a>
          </p>
        </section>
      </Layout>
    )
  }

  function signUpView() {
    return (
      <Layout>
        <section className={styles.auth_container}>
          <h1 className="header">Sing Up</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="inputs"
              type="text"
              id="email"
              value={email}
              placeholder="email@address.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contrase&ntilde;a:</label>
            <input
              className="inputs"
              type="password"
              id="password"
              value={password}
              placeholder="password ******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {isSingUp && (
              <button
                onClick={handleSingUp}
                className="button"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : 'Crear'}</span>
              </button>
            )}
          </div>
          <p>
            {isSingUp ? "¿Ya tienes cuenta?" : "¿Eres nuevo?"}{" "}
            <a href='#' onClick={() => setIsSingUp(!isSingUp)}>
              {isSingUp ? "Incia sesión" : "Regístrate"}
            </a>
          </p>
        </section>
      </Layout>
    )
  }

  function changePasswordView() {
    return (
      <Layout>
        <section className={styles.auth_container}>
          <h1>Contrase&ntilde;a</h1>
          <div>
            <label htmlFor="changePassword">Contrase&ntilde;a:</label>
            <input
              className="inputs"
              type="text"
              id="changePassword"
              value={email}
              placeholder="email@address.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
          <button
                // onClick={handleSingUp}
                className="button"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : ''}</span>
              </button>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className={styles.auth_container}>
          <h1 className="header">{isSingUp ? "Sing Up" : "Sing In"}</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          <div>
          <label htmlFor="email">Email:</label>
            <input
              className="inputs"
              type="text"
              id="email"
              value={email}
              placeholder="email@address.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contrase&ntilde;a:</label>
            <input
              className="inputs"
              type="password"
              id="password"
              value={password}
              placeholder="password ******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {isSingUp && (
              <button
                onClick={handleSingUp}
                className="button"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : 'Crear'}</span>
              </button>
            )}
            {!isSingUp && (
              <button
                onClick={handleSingIn}
                className="button"
                disabled={loading}
              >
                <span>{loading ? 'Loading' : 'Iniciar'}</span>
              </button>
            )}
          </div>
          <p>
            {isSingUp ? "¿Ya tienes cuenta?": "¿Eres nuevo?"}{" "}
            <a href='#' onClick={() => setIsSingUp(!isSingUp)}>
              {isSingUp ? "Incia sesión" : "Regístrate"}
            </a>
          </p>
      </section>
    </Layout>
  )
}