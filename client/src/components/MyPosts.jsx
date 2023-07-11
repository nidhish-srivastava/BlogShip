import React, { useEffect, useState } from 'react'
import { useBlogContext } from "../context/context";
import { Link } from 'react-router-dom';

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
             <div>
               <button className='read-blog-btn' >Click to Read the Blog</button>
              {userInfo?.id === e?.author?._id && (
                <div className="edit-row">
                  <Link to={``} className="edit-btn">
                    Edit this post
                  </Link>
                  <Link to={``} className="delete-btn">
                    Delete this post
                  </Link>
                </div>
              )}
            </div> 
          
          </div>
        );
      })}
    </div>
  )
}

export default MyPosts