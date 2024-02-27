import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import style from './card.module.css';
import EditCard from './EditCard';
import pink from '../../../assets/pink.jpg';
import blue from '../../../assets/blue.png';
import green from '../../../assets/green.svg';
import up from '../../../assets/up.png';
import "@fontsource/poppins";
import { checkboxUpdate, deleteCard, updateGroup } from '../../../apis/dashboard';
import ConfiramtionPage from '../Delete-logout/ConfiramtionPage';

export default function Card({ data, globalcollapse }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [collapse, setCollapse] = useState(globalcollapse)
  const [grpbtn, setGrpBtn] = useState()
  const [dataState, setDataState] = useState(data);
  const [deletePage, setDeletePage] = useState()
  




  useEffect(() => {
    setCollapse(globalcollapse);
  }, [globalcollapse]);

  useEffect(() => {
    const updateGroupAsync = async () => {
      if (grpbtn) {
        const group = grpbtn.toLowerCase()
        const response = await updateFunction(data._id, group);
        window.location.reload()
      }
    };

    updateGroupAsync();
  }, [grpbtn, data._id]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
    if(option === "edit"){
      setAddActive(true)
    }
    if(option === "share"){
      const shareableLinkId = uuidv4();
      const data = item
      
      // Construct the shareable link
      const shareableLink = `${window.location.origin}/share/${shareableLinkId}/${encodeURIComponent(JSON.stringify(data))}`;

      // Redirect to the shareable link
      navigator.clipboard.writeText(shareableLink)
      toast.success('Link copied', {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    }
    if(option === "delete"){
      setDeletePage(true)
      // deleteFunction()
      // window.location.reload()
    }
    
  };

  const deleteFunction = async ()=>{
    const reqBody = {cardId : item._id}
    const res = await deleteCard(reqBody)
    console.log(res)

    }

  const handleCancelAddMenu = () => {
    setAddActive(false);
  };

  const handleCollapse = () =>{
    collapse === true ? setCollapse(false) : setCollapse(true)
  }


  const item = data;
  const [completedTasks, setCompletedTasks] = useState(item.tasks.filter(task => task.completed).length);
  const [totalTasks, setTotalTasks] = useState(item.tasks.length);

 

  const currentDate= new Date()
  const formatDueDate = (dueDate, group) => {
    if (dueDate !== '') {
      const date = new Date(dueDate);
      const options = { month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
  
      if (item.group === 'done') {
        return (
          <span className={style.date} style={{ backgroundColor: '#63C05B', color: 'white' }}>
            {formattedDate}
          </span>
        );
      } else {
        return date < currentDate ? (
          <span className={style.date} style={{ backgroundColor: 'red', color: 'white' }}>
            {formattedDate}
          </span>
        ) : (
          <span className={style.date} style={{ backgroundColor: '#DBDBDB', color: '#5A5A5A' }}>
            {formattedDate}
          </span>
        );
      }
    } else return null;
  };
  

  const buttonDecider = (group) => {
    const buttonMap = {
      "todo": ["BACKLOG", "INPROGRESS", "DONE"],
      "backlog": ["TODO", "INPROGRESS", "DONE"],
      "inprogress": ["TODO", "BACKLOG", "DONE"],
      "done": ["TODO", "BACKLOG", "INPROGRESS"]
    };

    const buttons = buttonMap[group];

    if (buttons) {
      return (
        <div className={style.button_container}>
          {buttons.map((buttonLabel, index) => (
            <button key={index} className={style.card_bottom_buttons} onClick={() => { setGrpBtn(buttonLabel); }}>
              {buttonLabel}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };
  

  const updateFunction = async (id, group) => {
    const reqBody = {
      cardid: id,
      group: group
    };
    try {
      const response = await updateGroup(reqBody);
      console.log(response);
      return 'Update successful';
    } catch (error) {
      console.error(error);
      return 'Update failed';
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

const checkboxFunction = async (id, completed) => {
  try {
    const reqBody = {
      taskId: id,
      status: !completed,
    };
    console.log("reqbody " + JSON.stringify(reqBody) )

    const response = await checkboxUpdate(reqBody);
    

    // Update the state locally if the backend update was successful
    if (response && response.updatedTodo) {
      const updatedTasks = dataState.tasks.map(task => {
        if (task._id === id) {
          return { ...task, completed: !completed };
        }
        return task;
      });

      setDataState({
        ...dataState,
        tasks: updatedTasks,
      });

      const updatedCompletedTasks = updatedTasks.filter(task => task.completed).length;
      setCompletedTasks(updatedCompletedTasks);
    }

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <div key={item._id} className={style.card_container}>
        <div className={style.card_first_line}>
          <div className={style.card_priority}>
            <img src={getPriorityImage(item.priority)} style={{ width: "8px", height: "8px", marginRight: "5px" }} alt="" />
            {item.priority}
          </div>
          <div className={style.menuContainer}>
            <button onClick={toggleMenu} className={style.editbtn}>...</button>
            {isMenuOpen && (
              <div className={style.dropupMenu}>
                <div onClick={() => handleOptionClick('edit')}>Edit</div>
                <div onClick={() => handleOptionClick('share')}>Share</div>
                <div onClick={() => handleOptionClick('delete')} style={{ color: "red" }}>Delete</div>
              </div>
            )}
          </div>
        </div>

        <div className={style.card_second_line}>
          <h2 className={style.card_title}>{item.title}</h2>
        </div>

        <div className={style.card_third_line}>
          <div className={style.checklist_title}>Checklist ({completedTasks}/{totalTasks}) <button className={style.collapsebtn} onClick={()=>handleCollapse()}><img src={up} alt="" style={{width:"15px",height:"15px"}} /></button></div>
          {collapse ? 
          <div className={style.renderdiv}>
            {dataState.tasks.map((task, index) => (
            <div key={task._id} className={style.task} >
              <input
                type="checkbox"
                checked={task.completed}
                className={style.checkbox}
                onClick={()=>checkboxFunction(task._id,task.completed)}
              />
              <span style={{textAlign:"left"}}>{task.task || task.name}</span>
            </div>
          ))}</div>: null}
          
        </div>

        <div className={style.card_fourth_line}>
          <div className={style.dat}>{formatDueDate(item.date)}</div>
          {buttonDecider(item.group, item._id)}
        </div>

        
      </div>
      <div className={style.edit_page}>
        {addActive === true ? <EditCard onCancel={handleCancelAddMenu} 
                                        titleprop={item.title} priprop={item.priority}
                                        tasksprop={item.tasks}
                                        dateprop={item.date} 
                                        cardId={item._id}/> : null}
      </div>
      {deletePage && <ConfiramtionPage cancelfn={()=>setDeletePage(false)} operation={()=>deleteFunction()} text={"Delete"}/>}
      <div><ToastContainer
                position="top-right"
                
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false} 
                pauseOnHover={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
                />
              <ToastContainer /></div>
    </div>
  );
}
