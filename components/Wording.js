import React from 'react'
import Link from 'next/link'
import styles from '../styles/Wording.module.css'


function Wording({text, title}) {
  return (
    <header className={styles.header}>
        <Link href="/"><a className={styles.h1}>{title}</a></Link>
        <div className={styles.text}>{text}</div>
    </header>
  )
}

export default Wording