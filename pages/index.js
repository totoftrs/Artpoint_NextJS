import Head from 'next/head'
import Image from 'next/image'
import {useState, useEffect} from "react"
import Link from 'next/link'
import * as data from './data.json'
import Wording from '../components/Wording'
import styles from '../styles/Artists.module.css'


export default function Home() {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    async function fetchArtists() {
      const result = await fetch('/api/sendData')
      const data = await result.json()
      setAllData(data)
    }
    fetchArtists()
  },[])
  return (
    <div className={styles.wrapper}>
      <Wording text={allData.text} title={allData.title} />
      <picture>
        <Image src="/art.jpeg" 
        alt="Picture of the author"
        width={740}
        height={490}
        />
      </picture>
      <h2>Artists</h2>
        <section className={styles.section}>
                {
                  allData?.artists?.map((item)=>(
                  <div className={styles.content} key={item.id}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.info} dangerouslySetInnerHTML={{__html: item.texts[0].body}}></div>
                      <Link href={`/artist/${item.id}`}><a className={styles.btn}>artwork</a></Link>
                  </div>  
                  ))
                }
        </section>
    </div>
  )
}
