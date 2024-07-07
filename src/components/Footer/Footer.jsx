import React from 'react'
import style from './Footer.module.css'

function Footer() {
    const date = new Date().getFullYear()
  return (
    <footer className={style.footer}>
       <h4>Priyesh &copy; {date} All right are reserved </h4>
    </footer>
  )
}

export default Footer