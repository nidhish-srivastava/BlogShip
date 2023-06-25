import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBlogContext } from "../context/context";
import { Link } from "react-router-dom";
import axios from 'axios'


function GetSinglePost() {
    const {id2} = useParams()
//     const [e,setSinglePost] = useState()
//   const { userInfo } = useBlogContext();

    const getSinglePostData = async()=>{
        const response = await fetch(`http://localhost:4000/${id2}`,{
          credentials: 'include',
        })
        const data = await response.json()
        console.log(data);
    }
    useEffect(()=>{
        getSinglePostData()
    },[])
  return (
        <div className="post">
            {/* <h2>{e?.title}</h2>
            <div className="image-wrapper">
            <img src={`http://localhost:4000/${e?.file}`} alt="" />
            </div>
            <h3>{e?.descp}</h3>
            <div>
              {userInfo?.id === e?.author?._id && (
                <div className="edit-row">
                  <Link to={`/edit/${e._id}`} className="edit-btn">
                    Edit this post
                  </Link>
                </div>
              )}
              <h3 style={{color : "green"}}>-{e?.author?.username}</h3>
            </div> */}
          </div>
  )
}

export default GetSinglePost