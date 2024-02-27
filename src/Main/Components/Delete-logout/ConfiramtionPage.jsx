import React from 'react'
import style from './delete.module.css'

export default function ConfiramtionPage({operation,cancelfn,text}) {
  const decider = () =>{
    cancelfn()
  }
  const deleter = ()=>{
    operation()
    window.location.reload()
  }
  return (
    <div className={style.container}>
        <div className={style.content}>
            {`Are you sure you want to ${text} ?`}
            <div className={style.btn_container}>
            <button className={style.delete} onClick={()=>deleter()}>Yes, {`${text}`}</button>
            <button className={style.cancel} onClick={()=>decider()}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
