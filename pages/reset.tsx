import { useState, useContext, useEffect, SetStateAction } from "react";
import { useRouter } from "next/router";

import Layout from "../Layout/Layout";

import { supabase } from "../utils/supabaseClient";

import { RequireRecoveryType } from "../utils/helper/recoveryType";

import styles from '../styles/Reset.module.scss'

function Reset() {
  RequireRecoveryType()
  const [loading, setLoading] = useState(false)
  const [primeraClave, setPrimeraClave] = useState("")
  const [segundaClave, setSegundaClave] = useState("")
  const router = useRouter()

  const handleReset = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: segundaClave
      })
      if (error) throw  error
      alert("Contraseña actualizada correctamente")
      router.push("/")
    } catch(e) {
      alert(e)
    }
  }

  return (
    <Layout>
      <section className="container">
        <h1>Resetea tu contrase&ntilde;a</h1>
        <div>
          <label htmlFor="primeraClave">Contrase&ntilde;a:</label>
          <input
            className="inputs"
            type="password"
            id="primeraClave"
            value={primeraClave}
            autoComplete="true"
            onChange={(e) => setPrimeraClave(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="segundaClave">Repite la contrase&ntilde;a:</label>
          <input
            className="inputs"
            type="password"
            id="segundaClave"
            value={segundaClave}
            autoComplete="true"
            onChange={(e) => setSegundaClave(e.target.value)}
          />
        </div>
        <p>M&iacute;nimo 6 caracteres</p>
        <div>
          <button
            onClick={handleReset}
            className="button"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Enviar'}</span>
          </button>
        </div>
      </section>
    </Layout>
  )
}

export default Reset