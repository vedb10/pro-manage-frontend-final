import React, { useState,useEffect } from 'react'
import Home from './Home'
import ErrorPage from './ErrorPage'


export default function ProManage() {
  const [tokenPresent, setTokenPresent] = useState(sessionStorage.getItem('token') ? true : false)

  return (
    
    <div className='conatiner' style={{width:"auto",height:"auto"}}>
      {tokenPresent ? (<Home/>) : (<ErrorPage/>)}
    </div>
  )
}
