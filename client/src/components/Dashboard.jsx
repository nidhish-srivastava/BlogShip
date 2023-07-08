import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data,setData]=  useState([])
  const get = async() =>{
    const response = await fetch(`http://localhost:4000/home`,{credentials : 'include'})
    const data = await response.json()
    // console.log(data);
    setData(data)
  }
  useEffect(()=>{
     get()
  },[])
  return (
    <div className='post-container'>
       {data.map((e) => {
        return (
          <div className="post">
            <h2>{e?.title}</h2>
            <div className="image-wrapper">
            <img src={`http://localhost:4000/${e?.file}`} alt="" />
            </div>
            <h3>{e?.descp}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default Dashboard