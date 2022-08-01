import Head from 'next/head'
import {useState, useEffect} from "react"
import { useRouter } from 'next/router'
import Wording from './../../components/Wording'
import styles from '../../styles/Artist.module.css'


export default function Artist(props) {
  const [currentArtist, setCurrentArtist] = useState(null)
  const [page, setPage] = useState(null)
  const {query} = useRouter()


  useEffect(() => {
    async function fetchArtists() {
      const result = await fetch('/api/sendData')
      const {artists, title, text} = await result.json()
      setPage({ title, text})
      const artist = artists.find(artist =>  artist.id === query.id)
      setCurrentArtist(artist)
    }
    fetchArtists()
  },[query])
 
  if(page === null) return 'null'

  return (
    <div className={styles.wrapper}>
        <Wording text={page.text} title={page.title} />
        <div>
            <div className={styles.name}>{currentArtist && currentArtist.name}</div>
            <div className={styles.info}>
              {currentArtist.artworks.length === 0 && <h1>Not Artworks ...</h1>}
                {currentArtist && currentArtist.artworks.map((elem)=> (
                    <div className={styles.desc} key={elem.id}>
                        <div className={styles.slug}>{elem.slug}</div>
                        <div className={styles.texts} dangerouslySetInnerHTML={{__html: elem?.texts[0]?.body}}></div>
                    </div>  
                ))}
            </div>
        </div>
    </div>

  )
}
