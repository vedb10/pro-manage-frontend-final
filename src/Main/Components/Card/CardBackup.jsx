import React, { useState } from 'react'
import style from './card.module.css'
import AddMenu from '../Add-Menu/AddMenu'
import EditCard from './EditCard'
import pink from '../../../assets/pink.jpg'
import blue from '../../../assets/blue.png'
import green from '../../../assets/green.svg'
import "@fontsource/poppins";

export default function Card({idprop,titleprop,tasksprop,priorityprop}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const data = [
    {
      "_id": "65d774f6a417e33788d94491",
      "email": "ved",
      "title": "sample1",
      "priority": "HIGH PRIORITY",
      "tasks": [
        {
          "completed": true,
          "task": "t1",
          "_id": "65d774f6a417e33788d94492"
        },
        {
          "completed": true,
          "task": "t2",
          "_id": "65d774f6a417e33788d94493"
        }
      ],
      "date": "",
      "__v": 0
    },
    {
      "_id": "65d8c05c6c35a6682e75ac01",
      "email": "ved",
      "title": "reqqeegd",
      "priority": "HIGH PRIORITY",
      "tasks": [
        {
          "completed": true,
          "name": "bfsfs",
          "_id": "65d8c05c6c35a6682e75ac02"
        },
        {
          "completed": false,
          "name": "bfsbf",
          "_id": "65d8c05c6c35a6682e75ac03"
        }
      ],
      "date": "02/28/2024",
      "__v": 0
    },
    {
      "_id": "65d8c0716c35a6682e75ac05",
      "email": "ved",
      "title": "bfbsfbf",
      "priority": "MODERATE PRIORITY",
      "tasks": [
        {
          "completed": false,
          "name": "dvsvs",
          "_id": "65d8c0716c35a6682e75ac06"
        },
        {
          "completed": false,
          "name": "bfbdfpb",
          "_id": "65d8c0716c35a6682e75ac07"
        }
      ],
      "date": "02/29/2024",
      "__v": 0
    },
    {
      "_id": "65d8c0826c35a6682e75ac09",
      "email": "ved",
      "title": "johihhph",
      "priority": "LOW PRIORITY",
      "tasks": [
        {
          "completed": false,
          "name": "uhphiuh",
          "_id": "65d8c0826c35a6682e75ac0a"
        }
      ],
      "date": "02/28/2024",
      "__v": 0
    }
  ]
  
  console.log(typeof data)
  
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
  };

  const handleCancelAddMenu = () => {
    setAddActive(false);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item._id} className={style.card_container}>
          <div className={style.card_first_line}>
            <div className={style.card_priority}>
              {/* Adjust the image source based on the priority */}
              <img src={getPriorityImage(item.priority)} style={{width:"8px", height:"8px",marginRight:"5px"}} alt="" />
              {item.priority}
            </div>
            <div className={style.menuContainer}>
              <button onClick={toggleMenu} className={style.editbtn}>...</button>
              {isMenuOpen && (
                <div className={style.dropupMenu}>
                  <div onClick={() => { handleOptionClick('edit'); setAddActive(true); }}>Edit</div>
                  <div onClick={() => handleOptionClick('share')}>Share</div>
                  <div onClick={() => handleOptionClick('delete')} style={{ color: "red" }}>Delete</div>
                </div>
              )}
            </div>
          </div>

          <div className={style.card_second_line}>
            <h2 className={style.card_title}>{item.title}</h2>
          </div>

          <div>
            {item.tasks.map((task, index) => (
              <div key={task._id} className={style.task}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  // onChange={() => handleCheckboxChange(index)}
                />
                <span>{task.task || task.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className={style.edit_page}>
        {addActive === true ? <EditCard onCancel={handleCancelAddMenu} /> : null}
      </div>
    </div>
  );
}

function getPriorityImage(priorityprop) {
  // Adjust the image source based on the priority
  switch (priorityprop) {
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