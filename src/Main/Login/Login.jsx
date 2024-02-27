import React, { useState,useEffect } from 'react'
import { Link, useNavigate,  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import loginImg from '../../assets/loginImg.png'
import styles from './login.module.css'
import lock from '../../assets/lock.png'
import mail from '../../assets/mail.png'
import eyeimg from '../../assets/eye.jpg'
import { loginUser } from '../../apis/auth';

export default function Login() {
    const  [submitCheck, setSubmitCheck] = useState(false)
    const [eye, setEye] = useState("password")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    
    

    const handleEmailChange = (e)=>{
        setEmail(e.target.value)
    }
    const handlePassChange = (e)=>{
        setPassword(e.target.value)
    }

    const errorCheck = ()=>{
        if(!email || !password){
            setSubmitCheck(true)
        }
    }
   const handleSubmit = async ()=>{
    const reqBody = {
        email: email,
        password: password
    };

    try {
        if (reqBody.email && reqBody.password) {
            const resBody = await loginUser(reqBody);
            
            if (resBody && resBody.token) {
                console.log(resBody.email)
                console.log(resBody.token);
                sessionStorage.setItem("token", resBody.token);
                sessionStorage.setItem("email",resBody.email)
                toast.dismiss();
                navigate('/homepage');
            } else {
                toast.error('Invalid credentials', {
                    position: "top-center",
                    
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } 
    } catch (error) {
        console.error('Login failed:', error);
       
    }
    
    
   }
  
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <img src={loginImg} alt="loginImg" />
            <p className={styles.p1}>Welcome aboard my friend</p>
            <p className={styles.p2}>just a couple of clicks and we start</p>
        </div>

        <div className={styles.right}>

            <h1 >Login</h1>
            <div className={styles.inputbox}>
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={mail} alt="" />
                    <input type='text'placeholder='Email' style={{border:"none"}} value={email} onChange={handleEmailChange}/>
                </div>
                {submitCheck && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={lock} alt="" style={{width:"27px",height:"27px"}} />
                    <input type={eye} placeholder='Password' style={{border:"none"} } value={password} onChange={handlePassChange}/>
                    <button type='button' id='eyebtn'><img src={eyeimg} alt="" onClick={()=>eye === "password"? setEye("text"):setEye("password")}/></button>
                </div>
                {submitCheck && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
            </div>
            <div className={styles.btn_container}>
            <button type='submit' className={styles.loginbtn}onClick={()=>{handleSubmit();errorCheck()}}>Log in</button>
             
            <p style={{fontSize:"20px"}}>Have no account yet ?</p>
            <Link to="/register"><button className={styles.registerbtn} >Register</button></Link>
           
            </div>
            
        </div>
    </div>
  )
}
