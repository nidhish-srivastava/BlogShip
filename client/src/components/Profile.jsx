import React, { useState } from 'react'
import { useBlogContext } from '../context/context'
import a from '../1.jpg'

function Profile() {
    const {userInfo,dp,setDp} = useBlogContext()
  
    const changeHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.set("dp",dp)
        try {
           const response =  await fetch("http://localhost:4000/image",{
                method : "POST",
                body : formData,
                credentials : 'include'
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <main className='profile-page-container'>
        <div className="profile-image-big-wrapper">
        <img src={a} alt="" />
        </div>
        <input type="file" onChange={(e) => setDp(e.target.files[0])}/>
        <button onClick={changeHandler}>Change Profile Pic</button>
        <h2>{userInfo?.username}</h2>
    </main>
  )
}

export default Profile