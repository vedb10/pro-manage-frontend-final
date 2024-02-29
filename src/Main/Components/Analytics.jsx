import React, { useEffect, useState } from 'react'
import style from './analytics.module.css'
import bullet from '../../assets/bullet.png'
import { getAllCards } from '../../apis/analytics'


export default function Analytics() {
     const [backlogCount, setBacklogCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [lowCount, setLowCount] = useState(0);
  const [moderateCount, setModerateCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [dueDateCount, setDueDateCount] = useState(0);



     useEffect(()=>{
          getData()
     },[])

     const getData = async ()=>{
         
          const email = sessionStorage.getItem("email")
          const response = await getAllCards(email)
          const array = response.data
          const todo = array.filter(item => item.group === "todo");
          const backlog = array.filter(item => item.group === "backlog");
          const inprogress = array.filter(item => item.group === "inprogress");
          const done = array.filter(item => item.group === "done");
          const low = array.filter(item => item.priority === "LOW PRIORITY");
          const medium = array.filter(item => item.priority === "MODERATE PRIORITY");
          const High = array.filter(item => item.priority === "HIGH PRIORITY");
          const currentDate = new Date();
          const overdueItems = array.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate < currentDate;
          });

          setBacklogCount(backlog.length)
          setTodoCount(todo.length)
          setInProgressCount(inprogress.length)
          setCompletedCount(done.length)
          setLowCount(low.length)
          setModerateCount(medium.length)
          setHighCount(High.length)
          const datecount = overdueItems.length
          setDueDateCount(datecount)
          
          
          
      
     }
     // console.log("comp "+completedCount)
     // console.log("back "+backlogCount)
     // console.log("pro "+inProgressCount)
     // console.log("todo"+todoCount)
    


  return (
    <div className={style.container}>

      <div className={style.top}>
        Anlaytics
      </div>

      <div className={style.bottom}>
        <div className={style.tasks}>

            <ul className={style.list}>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>Backlog Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{backlogCount.toString().padStart(2, '0')}</div> 
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>To-do Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{todoCount.toString().padStart(2, '0')}</div> 
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>In-progress Tasks</div> 
                   <div style={{fontWeight:"bolder"}}>{inProgressCount.toString().padStart(2, '0')}</div> 
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>Completed Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{completedCount.toString().padStart(2, '0')}</div> 
              </li>
            </ul>
        </div>

        <div className={style.priority}>
        <ul className={style.list}>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>Low Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{lowCount.toString().padStart(2, '0')}</div> 
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>Moderate Tasks</div> 
                   <div style={{fontWeight:"bolder"}}>{moderateCount.toString().padStart(2, '0')}</div> 
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>High Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{highCount.toString().padStart(2, '0')}</div>
              </li>
              <li> <div className={style.list_div}><img src={bullet} alt="bullet" style={{width:"10px",height:"10px",marginRight:"8px"}}/>Due Date Tasks</div>
                   <div style={{fontWeight:"bolder"}}>{dueDateCount.toString().padStart(2, '0')}</div> 
              </li>
            </ul>

        </div>


      </div>


    </div>
  )
}
