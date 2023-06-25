import React, { useEffect, useState } from 'react'
import { useBlogContext } from "../context/context";


const MyPosts = () => {
  const { userInfo } = useBlogContext();
  const [myBlogArray,setMyBlogArray] = useState([])
  const username = userInfo?.username;

    const myPosts = async()=>{
        const response = await fetch(`http://localhost:4000/${username}`)
        const data = await response.json()
        console.log(data);
        setMyBlogArray(data)
      }
      useEffect(()=>{
        myPosts()
      },[])
  return (
    <div className='post-container'>
      {myBlogArray?.map((e) => {
        return (
          <div className="post">
            <h2>{e?.title}</h2>
            <div className="image-wrapper">
            <img src={`http://localhost:4000/${e?.file}`} alt="" className='my-posts-img' />
            </div>
            <h3>{e?.descp}</h3>
            {/* <div>
              {userInfo?.id === e?.author?._id && (
                <div className="edit-row">
                  <Link to={`/edit/${e._id}`} className="edit-btn">
                    Edit this post
                  </Link>
                </div>
              )}
            </div> */}
              <h3 style={{color : "green"}}>-{e?.author?.username}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default MyPosts