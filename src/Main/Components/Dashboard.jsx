import React, { useEffect, useState } from 'react'
import style from './dash.module.css'
import "@fontsource/roboto";
import collapse from '../../assets/collapseall.svg'
import plus from '../../assets/plus.png'
import { displayname, getCards } from '../../apis/dashboard';
import Card from './Card/Card';
import AddMenu from './Add-Menu/AddMenu';


export default function Dashboard() {
  const token = sessionStorage.getItem('token')
  const [username, setUserName] = useState() 
  const [addActive, setAddActitve] = useState(false)
  const [cardsData, setCardsData] = useState([]);
  const [collapseBacklog, setCollapseBacklog] = useState(false);
  const [collapseTodo, setCollapseTodo] = useState(false);
  const [collapseInProgress, setCollapseInProgress] = useState(false);
  const [collapseDone, setCollapseDone] = useState(false);
  const [option, setOption] = useState("week")

  

  // ... (your existing useEffects and other functions)

  const collapseFunction = (group) => {
    // Dynamically select the appropriate collapse state based on the group
    switch (group) {
      case "backlog":
        setCollapseBacklog((prevCollapse) => !prevCollapse);
        break;
      case "todo":
        setCollapseTodo((prevCollapse) => !prevCollapse);
        break;
      case "inprogress":
        setCollapseInProgress((prevCollapse) => !prevCollapse);
        break;
      case "done":
        setCollapseDone((prevCollapse) => !prevCollapse);
        break;
      default:
        break;
    }
  };
 
  const collector = async () => {
    try {
      const email = sessionStorage.getItem("email");
 
  
      const result = await getCards(email,option);
  
      
      setCardsData(result)
    } catch (error) {
      console.error(error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
   
    collector();
  }, [option]);


  if (cardsData && cardsData.data) {
    var data = cardsData.data;
  
    var todo = data.filter(item => item.group === "todo");
    var backlog = data.filter(item => item.group === "backlog");
    var inprogress = data.filter(item => item.group === "inprogress");
    var done = data.filter(item => item.group === "done");
  
    // Now you can use todo, backlog, inprogress, and done as needed
  } else {
    console.error("cardsData or cardsData.data is undefined.");
  }


 
  
  useEffect(()=>{
    getname()
    
  })
  const getname = async()=>{
    const reqBody = {token: token}
    const res = await displayname(reqBody)
    setUserName(res.name)
    // console.log(res)
    // console.log(username)


  }
  
  const getCurrentDate = () => {
    const today = new Date();
    const dayWithSuffix = addSuffixToDay(today.getDate());

    const formattedMonth = today.toLocaleDateString('en-US', { month: 'short' });

    return `${dayWithSuffix} ${formattedMonth} ${today.getFullYear()}`;
  };

  const addSuffixToDay = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const currentDate = getCurrentDate();

  const handleAdd = ()=>{
    setAddActitve((prevAddActive) => !prevAddActive);
  }

  const handleCancelAddMenu = () => {
    setAddActitve(false);
  };

  


  return (
    <div className={style.container}>
      {addActive === true ? <AddMenu onCancel={handleCancelAddMenu} />  : null }
      

      <div className={style.top}>
        <div className={style.top_first}>
          <h1 className={style.welcome}>Welcome! {username}</h1>
          <p className={style.date}>{currentDate}</p>
        </div>

        <div className={style.top_bottom}>
        <h1 className={style.board}>Board</h1>
        <select className={style.filter} onChange={(e) => setOption(e.target.value)}>
            <option className={style.option} value="week" style={{height:"20px"}}>This Week</option>
            <option className={style.option} value="month">This Month</option>
            <option className={style.option}value="today" >Today</option>
          </select>
        </div>
      </div>

      <div className={style.bottom}>
        <div>
          
        </div>
        <div>
          
        </div>
        <div className={style.card_container_box}>
          <div className={style.card_container}>
          <div className={style.card_buttons}>
            <p>Backlog</p>
            <button className={style.collapse} onClick={()=>collapseFunction("backlog")}><img src={collapse} alt="" /></button>
          </div>
          <div className={style.cards}>
          {Array.isArray(backlog) && backlog.map((item) => (
                <Card key={item._id} data={item} globalcollapse={()=>collapseBacklog} />
                ))}
          </div>
          

          </div>

          <div className={style.card_container}>
            <div className={style.card_buttons}>
            <p>To Do</p>
            <div className={style.todobtn}>
            <button className={style.plus} onClick={()=>handleAdd()} ><img src={plus} alt="" /></button>
            <button className={style.collapse} onClick={()=>collapseFunction("todo")}><img src={collapse} alt="" /></button>
            </div>
            </div>
            <div className={style.cards}>
            {Array.isArray(todo) && todo.map((item) => (
                <Card key={item._id} data={item} globalcollapse={collapseTodo}/>
                ))}
          </div>

          </div>

          <div className={style.card_container}>
          <div className={style.card_buttons}>
          <p>In-Progress</p>
          <button className={style.collapse} onClick={()=>collapseFunction("inprogress")}><img src={collapse} alt="" /></button>
          </div>
          <div className={style.cards}>
          {Array.isArray(inprogress) && inprogress.map((item) => (
                <Card key={item._id} data={item} globalcollapse={collapseInProgress} />
                ))}
          </div>
          </div>

          <div className={style.card_container}>
          <div className={style.card_buttons}>
          <p>Done</p>
          <button className={style.collapse} onClick={()=>collapseFunction("done")}><img src={collapse} alt="" /></button>
          </div>
          <div className={style.cards}>
          {Array.isArray(done) && done.map((item) => (
                <Card key={item._id} data={item} globalcollapse={collapseDone} />
                ))}
          </div>
          </div>
        </div>


      </div>
      
    </div>
  )
}
