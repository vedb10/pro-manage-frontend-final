
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import ProManage from './Main/Homepage/ProManage';
import Login from './Main/Login/Login';
import Register from './Main/Register/Register';
import ShareableCard from './Main/Components/Card/ShareableCard';

function App() {
  const location = useLocation();
  return (
    <div className="App">
    

     <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/homepage" element={<ProManage />} />  
              <Route path="/share/:shareableLinkId/:data" element={<ShareableCard/>} />   
                       
            </Routes>
    </div>
  );
}

export default App;
