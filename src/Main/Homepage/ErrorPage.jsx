import React from 'react'
import estyle from './error.module.css'
import errorImg from '../../assets/errorPage.png'
import { Link } from 'react-router-dom'
export default function ErrorPage() {
  
  return (
    <div className={estyle.container}>
      <img className={estyle.errorimg} src={errorImg} alt=""/>
      <Link to="/"><button ><p>Click to login</p></button></Link>
      
    </div>
  )
}
