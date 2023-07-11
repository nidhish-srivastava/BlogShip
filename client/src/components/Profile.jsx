import React from 'react'
import { useBlogContext } from '../context/context'
import a from '../1.jpg'

function Profile() {
    const {userInfo,dp,setDp} = useBlogContext()
      
    const changeDpHandler = (e) =>{
          const file = e.target.files[0]
          if(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
            setDp(reader.result)  //* First converting it to base64,then setting the state for preview
            }
          }
    }

    // const uploadDp = async(e)=>{
    //     e.preventDefault()
    //     try {
    //        const response =  await fetch("http://localhost:4000/image",{
    //             method : "POST",
    //             crossDomain : true,
    //             headers : {
    //               "Content-Type" : "application/json",
    //               Accept : "application/json",
    //               "Access-Control-Allow-Origin" : "*"
    //             },
    //             body : JSON.stringify({
    //               dp : dp
    //             }),
    //         })
    //         const data = await response.json()
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
    <main className='profile-page-container'>
        <div className="profile-image-big-wrapper">
        <img src={dp ? dp : a} alt="" />
        </div>
        <label for="file-upload" class="custom-file-upload">
        Choose a file
      </label>
        <input type="file" accept='image/*' id='file-upload' onChange={changeDpHandler}/>
        {/* <button onClick={uploadDp} className='change-dp'>Change Profile Pic</button> */}
        <h2>{userInfo?.username}</h2>
    </main>
  )
}

export default Profile