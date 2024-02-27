import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import style from './share.module.css';
import pink from '../../../assets/pink.jpg';
import blue from '../../../assets/blue.png';
import green from '../../../assets/green.svg';
import logo from '../../../assets/logo.png';


export default function ShareableCard() {
    const { data } = useParams();
    const decodedData = JSON.parse(decodeURIComponent(data));
    const [dataState, setDataState] = useState(data);
    const [date,setDate] = useState()
    
 
  
    const [completedTasks, setCompletedTasks] = useState(decodedData.tasks.filter(task => task.completed).length);
    const [totalTasks, setTotalTasks] = useState(decodedData.tasks.length);
  
   
  
    const currentDate= new Date()
    const formatDueDate = (dueDate, group) => {
      if (dueDate !== '') {
        const date = new Date(dueDate);
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        

        return (
          <div style={{display:"flex"}}>
            <span className={style.datepara}>Due date</span>
          <span className={style.date} style={{ backgroundColor: 'red', color: 'white' }}>
            {formattedDate}
          </span></div>)
      }
    
        
          
         
       
    };
    
    
  const getPriorityImage = (priority)=> {
    switch (priority) {
      case 'HIGH PRIORITY':
        return pink;
      case 'MODERATE PRIORITY':
        return blue;
      case 'LOW PRIORITY':
        return green;
      default:
        return '';
    }
  }


    
  
    return (
      <div className={style.share}>
        <div>

        <img src={logo} alt="" className={style.logo} />
        </div>
        <div key={decodedData._id} className={style.card_container}>
          <div>
          <div className={style.card_first_line}>
            <div className={style.card_priority}>
              <img src={getPriorityImage(decodedData.priority)} style={{ width: "8px", height: "8px", marginRight: "5px" }} alt="" />
              {decodedData.priority}
            </div>
          </div>
  
          <div className={style.card_second_line}>
            <h2 className={style.card_title}>{decodedData.title}</h2>
          </div></div>
  
          <div className={style.card_third_line}>
            <div className={style.checklist_title}>Checklist ({completedTasks}/{totalTasks})</div>
            {
          <div className={style.renderdiv}>
            {decodedData.tasks.map((task, index) => (
            <div key={task._id} className={style.task} >
              <input
                type="checkbox"
                checked={task.completed}
                className={style.checkbox}
                
              />
              <span>{task.task || task.name}</span>
            </div>
          ))}</div>}
          <div className={style.card_fourth_line}>
            <div className={style.dat}>{formatDueDate(decodedData.date)}</div>
           
          </div>
  
          
        </div>
       
       
      </div></div>
    );
  }
