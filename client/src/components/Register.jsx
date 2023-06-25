import React, { useState } from 'react'

const RegisterPage = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const register = async (e) => {
        e.preventDefault();
       
        const response = await fetch("http://localhost:4000/register",{
                method:'POST',
                body: JSON.stringify({username,password}),
                headers: {'Content-Type':'application/json'},
            })
            console.log(response);
        if(response.status == 200){
            alert("registration succesfull,Now Login to continue");
        }
        else {
            alert("registration failed");
        }
       
    }
  return (
    <>
    <form className='login' onSubmit={register}>
        <h1>Register</h1>
            <input type="text" autoFocus required placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" required placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
        </form> 
    </>
  )
}

export default RegisterPage