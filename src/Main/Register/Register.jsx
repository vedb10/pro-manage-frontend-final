import React, {  useState } from 'react'
import { Link } from "react-router-dom";
import loginImg from '../../assets/loginImg.png'
import styles from './register.module.css'
import lock from '../../assets/lock.png'
import mail from '../../assets/mail.png'
import eyeimg from '../../assets/eye.jpg'
import user from  '../../assets/user.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../apis/auth';

export default function Register() {
  
  const  [submitCheck, setSubmitCheck] = useState(false)
  const [eye, setEye] = useState("password")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.name && formData.email && formData.password && formData.confirmPassword){
      if(formData.password === formData.confirmPassword){
       
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        const response = await registerUser({...formData})
        setSubmitCheck(false)
        
      
      }  else toast.error('Password did not match', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
    }
    
   
    
  };
   
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <img src={loginImg} alt="loginImg" />
            <p className={styles.para_fl}>Welcome aboard my friend</p>
            <p className={styles.para_sl}>just a couple of clicks and we start</p>
        </div>

        <div className={styles.right}>
            <h1 >Register</h1>
            <form className='styles.form' onSubmit={handleSubmit}>
            <div className={styles.inputbox}>
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={user} alt="" />
                    <input type='text'placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} style={{border:"none"} }/>
                    <div>
                      </div>
                </div>
                {(formData.name === '' && submitCheck) && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={mail} alt="" />
                    <input type='text'placeholder='Email' name='email' value={formData.email} onChange={handleInputChange} style={{border:"none"} }/>
                    <div>
                      </div>
                </div>
                {formData.email === '' && submitCheck && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={lock} alt="" style={{width:"27px",height:"27px"}} />
                    <input type={eye} placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} style={{border:"none"} } />
                    <button type='button' id='eyebtn'><img src={eyeimg} alt="" onClick={()=>eye === "password"? setEye("text"):setEye("password")}/></button>
                   <div>
                    </div>
                </div>
                {formData.password === '' && submitCheck && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
                <div className={styles.field} style={submitCheck === false ? {marginBottom: "30px"} : {marginTop: "30px"} }>
                    <img src={lock} alt="" style={{width:"27px",height:"27px"}} />
                    <input type={eye} placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} style={{border:"none"} } />
                    <button type='button' id='eyebtn'><img src={eyeimg} alt="" onClick={()=>eye === "password"? setEye("text"):setEye("password")}/></button>
                    <div>
                      </div>
                </div>
                {formData.confirmPassword === '' && submitCheck && <span style={{marginBottom:"25px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</span>}
            </div>
            <div className={styles.btn_container}>
            <button type='submit' onClick={()=>setSubmitCheck(true)} className={styles.loginbtn}>Register</button>
            <p style={{fontSize:"20px"}}>Have an account ?</p>
            <Link to="/"><button className={styles.registerbtn}>Log in</button></Link>
            </div>
          </form>
            
            
        </div>
    </div>
  )
}
