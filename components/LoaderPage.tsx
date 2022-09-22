import styles from '../styles/components/LoaderPage.module.scss'

import { item } from "../utils/interface/item.interface"

import Layout from "../Layout/Layout"

type propsType = {
  item: item | null,
  id: string | string[] | undefined
}
export default function LoaderPage({ item, id }: propsType) {
  if ( item === null ) {
    return <Container>Loading...</Container>
  }

  if (item === undefined) {
    return <Container>No url found {id}</Container>
  }

  return (
    <Container>
      <p>Redirecting to {item.url}</p>
        <div className={styles.contenedor_loader}>
          <div className="loader1"></div>
          <div className="loader2"></div>
          <div className="loader3"></div>
          <div className="loader4"></div>
        </div>
    </Container>
  )
}

function Container({ children }: any) {
  return (
    <Layout>
      <section className={styles.LoaderContainer}>
        {children}
      </section>
    </Layout>
  );
}