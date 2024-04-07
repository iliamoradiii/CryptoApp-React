import React from 'react'
import styles from './Layout.module.css'

function Layout({children}) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
            <a href="/">ilia moradi </a>is here to develop !
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>developed by ilia</p>
      </footer>
    </>
  )
}

export default Layout
