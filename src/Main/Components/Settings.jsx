import React, { useState } from 'react'
import style from './setting.module.css'
import eyeimg from '../../assets/eye.jpg'
import user from  '../../assets/user.png'
import lock from '../../assets/lock.png'
import { ToastContainer, toast } from 'react-toastify';
import { updatepass } from '../../apis/auth'


export default function Settings() {
        const [eye, setEye] = useState("password")
        const token = sessionStorage.getItem('token')
        const [formData, setFormData] = useState({
          name: '',
          password: '',
          newPassword: '',
          token:token
        });
        
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        };
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          if(formData.name && formData.password && formData.newPassword){
            setFormData({
              name: '',
              password: '',
              newPassword: '',
              token:token
            });
            console.log('Form data:', formData);
      
              const response = await updatepass({...formData})
            //   console.log(response.token)
            
            
          }else toast.error('Fill all the data', {
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
  return (
    <div className={style.container}>
        <div className={style.top}>
            Settings
        </div>

        <div className={style.input_box}>
          <form onSubmit={handleSubmit}>
        <div className={style.field}>
                <img src={user} alt="" />
                <input type='text'placeholder='Name' name='name' value={formData.name} onChange={handleInputChange} style={{border:"none"} }/>
                <div>
            {/* <p style={{margin:"0px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</p> */}
                    </div>
                    </div>
        <div className={style.field}>
            <img src={lock} alt="" style={{width:"27px",height:"27px"}} />
            <input type={eye} placeholder='Old Password' name='password' value={formData.password} onChange={handleInputChange} style={{border:"none"} } />
            <button type='button' id='eyebtn'><img src={eyeimg} alt="" onClick={()=>eye === "password"? setEye("text"):setEye("password")}/></button>
            <div>
            {/* <p style={{margin:"0px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</p> */}
            </div>
            </div>

            <div className={style.field}>
            <img src={lock} alt="" style={{width:"27px",height:"27px"}} />
            <input type={eye} placeholder='New Password' name='newPassword' value={formData.newPassword} onChange={handleInputChange} style={{border:"none"} } />
            <button type='button' id='eyebtn'><img src={eyeimg} alt="" onClick={()=>eye === "password"? setEye("text"):setEye("password")}/></button>
            <div>
            {/* <p style={{margin:"0px",color:"red",alignItems:"left",padding:"0px",display:"flex"}}>Required field</p> */}
            </div>
            </div>
            <button type='submit' className={style.updatebtn}>Update</button>
            </form>





                      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
              <ToastContainer />
                
        </div>
    </div>
  )
}
