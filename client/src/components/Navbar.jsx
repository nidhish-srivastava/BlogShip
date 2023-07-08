import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/context";
import a from '../1.jpg'

const Navbar = () => {
  const { userInfo, setUserInfo } = useBlogContext();
  const navigate = useNavigate();

  const getProfileInfo = async() =>{
      const response = await fetch("http://localhost:4000/profile",{
        credentials: "include"
      })
      const data =await response.json()
      if(response.ok){
        // console.log("user");
        setUserInfo(data)
        // console.log(data)
      }
  }

  useEffect(() => {
   getProfileInfo()
  }, []);

  const username = userInfo?.username;

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    console.log("logged out");
    navigate("/");
    setUserInfo(null);
  };

  return (
    <div className="navbar">
      <div className="left">
        <div className="logo" style={{ marginRight: "auto" }}>
          <h2>BlogShip</h2>
        </div>
        <Link to={`/`}>Home</Link>
      </div>
      <div className="right">
        {username ? (
          <>
            <Link to={`/${userInfo?.username}/${userInfo?.id}`}>All Blogs</Link>
            <Link to={`/my-blogs/${username}`}>My Blogs</Link>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
            <Link to={`/profile`}>
            <div className="profile-pic-wrapper">
              <img src={a}/>
            </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
