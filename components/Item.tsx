import Link from 'next/link'
import styles from '../styles/components/Item.module.scss'

import { item } from '../utils/interface/item.interface'

export default function Item({ url, shortUrl, views }: item) {
  return (
    <section className={styles.item}>
      <div className={styles.item_content}>
        <span>URL: </span>
        <span>{url}</span>
      </div>
      <div className={styles.item_content}>
        <span>URL short: </span>
        <Link href={`http://localhost:3000/url/${shortUrl}`}>
          <a target="_target" rel='noreferrer'>http://localhost:3000/url/{shortUrl}</a>
        </Link>
      </div>
      <div className={styles.item_content}>
        <span>Views: </span>
        <span>{views}</span>
      </div>
    </section>
  )
}