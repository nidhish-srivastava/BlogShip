import React, { useEffect, useState } from "react";
import { useBlogContext } from "../context/context";
import { Link } from "react-router-dom";

const Get = () => {
  const [data, setData] = useState([]);
  const { userInfo } = useBlogContext();
  const getData = async () => {
    const response = await fetch("http://localhost:4000");
    const data = await response.json()
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="post-container">
      {data.map((e) => {
        return (
          <Link to={`/${e._id}`}>
          <div className="post">
            <h2>{e?.title}</h2>
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
            </div>
          </div>
              </Link>
        );
      })}
    </div>
  );
};

export default Get;
