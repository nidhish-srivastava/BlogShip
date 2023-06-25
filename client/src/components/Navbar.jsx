import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/context";

const Navbar = () => {
  const { userInfo, setUserInfo } = useBlogContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        console.log(userInfo);
      });
    });
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
