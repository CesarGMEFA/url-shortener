
import styles from "../styles/Layout/Layout.module.scss"

export default function Layout({ children }: any) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}