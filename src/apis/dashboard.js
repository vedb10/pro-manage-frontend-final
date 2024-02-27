import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const displayname = async () => {
  try {
    const reqUrl = `${backendUrl}/getname`;
    const token = sessionStorage.getItem('token');
    
    const response = await axios.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Propagate the error to the calling function
  }
};

export const savedData = async ({email, title, priority, tasks, date, group,logdate}) =>{
  try {

    const reqUrl = `${backendUrl}/save`
    const payLoad = {email, title, priority, tasks, date, group, logdate}
    const response = await axios.post(reqUrl, payLoad)
    return response.data
    
  } catch (error) {
    console.log(error)
  }
}

export const getCards = async (email,option) => {
  try {
    const reqUrl = `${backendUrl}/getcards?email=${email}&filterBy=${option}`;

    const response = await axios.get(reqUrl);


    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCards = async ({title, priority, tasks, date, _id}) =>{
  try {
    const payLoad = {title,priority, tasks, date, _id}
    const reqUrl = `${backendUrl}/updatecards`
    const response = await axios.put(reqUrl,payLoad)
    return response.data

    
  } catch (error) {
    console.log(error)
  }
}


export const updateGroup = async ({cardid, group})=>{
  try {
    const reqUrl = `${backendUrl}/updategroup`
  const payLoad = {cardid, group}
  const response = await axios.put(reqUrl, payLoad)

  return response.data
    
  } catch (error) {
    console.log(error)
  }

}

export const checkboxUpdate = async ({taskId, status}) =>{
  const reqUrl = `${backendUrl}/checkboxupdate`
  const payLoad = {taskId, status}
  const response = await axios.put(reqUrl, payLoad)
  return response.data

}

export const deleteCard = async ({cardId}) =>{
  try {
    const reqUrl = `${backendUrl}/deletecard`
  const payLoad = {cardId}
  const response = await axios.delete(reqUrl, { data: payLoad })
  return response.data
    
  } catch (error) {
    console.log(error)
    
  }
  
}


