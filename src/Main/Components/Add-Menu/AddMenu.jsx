import React, { useEffect, useRef, useState } from 'react'
import styles from './add.module.css'
import pink from '../../../assets/pink.jpg'
import blue from '../../../assets/blue.png'
import green from '../../../assets/green.svg'
import plus from '../../../assets/plus.png'
import dustbin from '../../../assets/delete.png'
import 'react-datepicker/dist/react-datepicker.css';
import { savedData } from '../../../apis/dashboard'

export default function AddMenu({onCancel}) {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [title, setTitle] = useState();
  const [priority, setPriority] = useState()
  const [date, setDate] = useState('')
  const [cancel, setCancel] = useState(true)


  // console.log(sessionStorage.getItem('reqbody'))
  const addTask = () => {
      setTasks([...tasks, { completed: false, name: newTaskName }]);
      setNewTaskName('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleTaskNameChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = value;
    setTasks(updatedTasks);
  };

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    var formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    if(selectedDate === '' || null){
      return formattedDate = ''
    }
    return formattedDate
  };
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  console.log(formattedToday)

  const saveObj = async ()=>{
    if(!title || tasks.length === 0 || !priority){
      console.log("enter all data")
    }else{
    const newReqBody = {
      email: sessionStorage.getItem('email'),
      title: title,
      priority: priority,
      tasks: tasks,
      date:date,
      group:"todo",
      logdate:today
    };
    // console.log(tasks)
    await savedData(newReqBody)
    
    sessionStorage.setItem('reqbody',JSON.stringify(newReqBody))
    

    setTitle('');
    setTasks([]);
    setNewTaskName('');
    setPriority('');
    setDate('')
    window.location.reload()
  }}

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div >{cancel &&
      <div id='card_container' className={styles.container} >
      
      <div className={styles.menu}>
          <div className={styles.fline}>
            <p1 className={styles.title} >Title <span style={{color:"red"}}>*</span></p1>
            <input required='true' type='text' placeholder='Enter Task Title'className={styles.task_input} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          </div>
          
          <div className={styles.sline}>
            <p1 className={styles.select} >Select Priority<span style={{color:"red"}}>*</span></p1>
            <button className={styles.pributton} style={priority === "HIGH PRIORITY"?{backgroundColor:"#EEECEC"}:{backgroundColor:"white"}} onClick={()=>setPriority("HIGH PRIORITY")}><img src={pink} alt="" className={styles.circle} />HIGH PRIORITY</button>
            <button className={styles.pributton} style={priority === "MODERATE PRIORITY"?{backgroundColor:"#EEECEC"}:{backgroundColor:"white"}} onClick={()=>setPriority("MODERATE PRIORITY")}><img src={blue} alt="" className={styles.circle}/>MODERATE PRIORITY</button>
            <button className={styles.pributton} style={priority === "LOW PRIORITY"?{backgroundColor:"#EEECEC"}:{backgroundColor:"white"}} onClick={()=>setPriority("LOW PRIORITY")}><img src={green} alt="" className={styles.circle} />LOW PRIORITY</button>
          </div>
          <div className={styles.tline}>
      <p1 className={styles.checklist}>Checklist<span style={{color:"red"}}>*</span></p1>
      <div className={styles.task_container}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.task}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(index)}
              
            />
            <textarea
              placeholder='Add a task'
              value={task.name}
              onChange={(e) => handleTaskNameChange(index, e.target.value)}
            />
            <button className={styles.deletebtn} onClick={() => deleteTask(index)}> <img src={dustbin} style={{width:"20px",height:"20px"}}/> </button>
          </div>
        ))}
      </div>
    </div>
      <div className={styles.add_task_container} >
        <button className={styles.addtask} onClick={addTask}>
              <img src={plus} alt="" style={{width:"12px",height:"12px",marginRight:"8px"}} />Add New
            </button>
      </div>

      <div className={styles.bottom_buttons}>
      <div className={styles.custom_date_picker}>
          <button className={styles.custom_date_picker} onClick={handleButtonClick}>
          <input type="date" name="" id="" ref={inputRef}  onChange={(e)=>setDate(handleDateChange(e))}/>
          <span className={styles.custom_placeholder}>{date === '' ? "Select due date" : date}</span>
          </button>
          </div>

          <div className={styles.right_side_btn}>
          <button className={styles.cancelbtn} onClick={handleCancel}>Cancel</button>
          <button className={styles.savebtn} onClick={()=>saveObj()}>Save</button>
          </div >

          {/* <button className={styles.savebtn}>save</button>
          <button className={styles.cancelbtn}>cancel</button> */}
      </div>
     
        </div>

     
        
    </div>
      
      }</div>
    
    
  )
}
