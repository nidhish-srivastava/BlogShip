import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/context";

const Navbar = () => {
  const { userInfo, setUserInfo } = useBlogContext();
  const navigate = useNavigate();

  const getProfileInfo = async() =>{
      const response = await fetch("http://localhost:4000/profile",{
        credentials: "include"
      })
      const data =await response.json()
      console.log(data);
      if(response.ok){
        console.log("user");
        setUserInfo(data)
      }
  }

  useEffect(() => {
   getProfileInfo()
  }, []);

  const username = userInfo?.username;
  const userid = userInfo?.id

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
