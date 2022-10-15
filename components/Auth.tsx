import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'

import Layout from '../Layout/Layout'

import styles from "../styles/components/Auth.module.scss"

export default function Auth() {
  const SIGN_UP_VIEW = "sign-up-view"
  const SIGN_IN_VIEW = "sign-in-view"
  const CHANGE_PASSWORD_VIEW = "change-password-view"

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState(SIGN_IN_VIEW)
  const [mailSend, setMailSend] = useState(false)


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
    } catch(e: any) {
      alert(e.message)
    } finally {
      setEmail("")
      setPassword("")
      setLoading(false)
    }
  }

  const sendEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset'
      })
      if (error) throw error
      console.log('sending email', data)
      setMailSend(true)
    } catch(e: any) {
      alert(e.message)
    } finally {
      setEmail("")
      setLoading(false)
    }
  }

  function signInView() {
    return (
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
          ¿Eres nuevo?{" "}
          <a href='#' onClick={() => setView(SIGN_UP_VIEW)}>
            Regístrate
          </a>
        </p>
        <p>
          <a href='#' onClick={() => setView(CHANGE_PASSWORD_VIEW)}>
            Se me olvido la clave
          </a>
        </p>
      </section>
    )
  }

  function signUpView() {
    return (
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
          <button
            onClick={handleSingUp}
            className="button"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'registrarse'}</span>
          </button>
        </div>
        <p>
          ¿Ya tienes cuenta?{" "}
          <a href='#' onClick={() => setView(SIGN_IN_VIEW)}>
            Incia sesión
          </a>
        </p>
      </section>
    )
  }

  function changePasswordView() {
    if (mailSend) {
      return (
        <section className={styles.auth_container}>
          <h1>Revisa tu email</h1>
        </section>
      )
    }

    return (
      <section className={styles.auth_container}>
        <h1>Resetear contrase&ntilde;a</h1>
        <div>
          <label htmlFor="changePassword">Email:</label>
          <input
            className="inputs"
            type="text"
            id="changePassword"
            value={email}
            placeholder="Tu email"
            autoComplete="true"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
        <button
              onClick={sendEmail}
              className="button"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Enviar'}</span>
            </button>
        </div>
      </section>
    )
  }

  function getView() {
    if(view == SIGN_IN_VIEW) return signInView()
    if(view == SIGN_UP_VIEW) return signUpView()
    if(view == CHANGE_PASSWORD_VIEW) return changePasswordView()
  }

  return (
    <Layout>
        {getView()}
    </Layout>
  )
}