import React from 'react'
import { useBlogContext } from '../context/context'

function Profile() {
    const {userInfo,dp,setDp} = useBlogContext()
      
    const changeDpHandler = (e) =>{
          const file = e.target.files[0]
          if(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
            setDp(reader.result)  
            }
          }
    }

    // const uploadDp = async(e)=>{
    //   console.log(dp);
    //     e.preventDefault()
    //     try {
    //        const response =  await fetch("http://localhost:4000/image",{
    //             method : "POST",
    //             body : dp,
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
    <main className='profile-page-container'>
        <div className="profile-image-big-wrapper">
        <img src={dp} alt="" />
        </div>
        <label for="file-upload" class="custom-file-upload">
        Choose a file
      </label>
        <input type="file" id='file-upload' onChange={changeDpHandler}/>
        {/* <button onClick={uploadDp} className='change-dp'>Change Profile Pic</button> */}
        <h2>{userInfo?.username}</h2>
    </main>
  )
}

export default Profile