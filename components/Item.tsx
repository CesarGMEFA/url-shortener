import Link from 'next/link'
import { useContext } from 'react'
import styles from '../styles/components/Item.module.scss'

import { DataContext } from '../utils/hooks/appContext'
import { item } from '../utils/interface/item.interface'

interface itemWithFunction {
  item: item
}

export default function Item({ item }: itemWithFunction) {

  const { deleteUrl }: any = useContext(DataContext)
  return (
    <section className={styles.item}>
      <section className={styles.item_content}>
        <div>
          <span className={styles.infoTitle}>URL: </span>
          <span>{item.url}</span>
        </div>
        <div>
          <span className={styles.infoTitle}>URL short: </span>
          <Link href={`/url/${item.shortUrl}`}>
            <a target="_blank" rel='noreferrer'>https://url-shortener-cg.vercel.app/url/{item.shortUrl}</a>
          </Link>
        </div>
        <div>
          <span className={styles.infoTitle_views}>Views: </span>
          <span>{item.views}</span>
        </div>
      </section>
      <button className={styles.buttonDelete} type='button' onClick={() => deleteUrl(item.shortUrl)}>X</button>
    </section>
  )
}