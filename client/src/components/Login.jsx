import React, { useState } from 'react'
import {useBlogContext} from "../context/context"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {setUserInfo,userInfo} = useBlogContext()
    const navigate = useNavigate()

    
    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
          });
        if(response.ok){
            const data = await response.json()
            console.log(data);
            setUserInfo(data)
           navigate(`all-posts`)
        } else {
            alert('wrong credentials')
        }
    }

   
  return (
        <form className='login' onSubmit={login}>
        <h1>Login</h1>
            <input type="text" autoFocus required placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder='password'  required value={password} onChange={e => setPassword(e.target.value)}/>
            <button>Login</button>
        </form> 
  )
}

export default LoginPage