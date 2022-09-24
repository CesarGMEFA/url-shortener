import Link from 'next/link'
import { MutableRefObject } from 'react'
import styles from '../styles/components/Item.module.scss'

import { item } from '../utils/interface/item.interface'

import { supabase } from '../utils/supabaseClient'

interface itemWithFunction {
  item: item,
  deleteUrl: Function
}
export default function Item({ item, deleteUrl }: itemWithFunction) {

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
            <a target="_blank" rel='noreferrer'>https://url-shortener-cg.vercel.app//url/{item.shortUrl}</a>
          </Link>
        </div>
        <div>
          <span className={styles.infoTitle_views}>Views: </span>
          <span>{item.views}</span>
        </div>
      </section>
      <button className={styles.button} type='button' onClick={() => deleteUrl(item.shortUrl)}>X</button>
    </section>
  )
}