import React, { Component, useState } from 'react'
import hstyle from './home.module.css'
import logo from '../../assets/logo.png'
import dash from '../../assets/dash.svg'
import analytics from '../../assets/analytics.png'
import settings from '../../assets/settings.png'
import Dashboard from '../Components/Dashboard'
import Analytics from '../Components/Analytics'
import Settings from '../Components/Settings'
import logout from '../../assets/logout.png'
import { useNavigate } from 'react-router'
import Delete from '../Components/Delete-logout/ConfiramtionPage'
import ConfiramtionPage from '../Components/Delete-logout/ConfiramtionPage'

export default function Home() {
  const [selectedButton, setSelectedButton] = useState('Dashboard');
  const [logoutPage, setLogoutPage] = useState()
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    
  };

  const handleLogout= ()=>{
    sessionStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className={hstyle.container}>
        <div className={hstyle.left}>
            <div className={hstyle.img_container}>
            <img src={logo} alt="" />
            </div>
            <nav className={hstyle.nav_container}>
              <ul className={hstyle.nav_btn}>
                <button style={{ backgroundColor: selectedButton === 'Dashboard' ? '#59b8e43b' : 'white',transition: 'background-color 0.3s ease' }}
                onClick={() => handleButtonClick('Dashboard')}><img src={dash}/> Dashboard</button>
                <button style={{ backgroundColor: selectedButton === 'Analytics' ? '#59b8e43b' : 'white',transition: 'background-color 0.3s ease' }}
                onClick={() => handleButtonClick('Analytics')}><img src={analytics}/> Analytics</button>
                <button style={{ backgroundColor: selectedButton === 'Settings' ? '#59b8e43b' : 'white',transition: 'background-color 0.3s ease' }}
                onClick={() => handleButtonClick('Settings')}><img src={settings}style={{width:"26px",height:"26px"}}/> Settings</button>
              </ul>
            </nav>
        
            <button type='button' className={hstyle.logoutbtn} onClick={()=>setLogoutPage(true)}><img src={logout} alt="" />
            Log out 
            </button>

            {logoutPage && <ConfiramtionPage cancelfn={()=>setLogoutPage(false)} operation={()=>handleLogout()} text={"Logout"} />}
        </div>

      <div className={hstyle.right} >
        {selectedButton === 'Dashboard' && <Dashboard/>}
        {selectedButton === 'Analytics' && <Analytics/>}
        {selectedButton === 'Settings' && <Settings/>}
      </div>
    </div>
  )
}
