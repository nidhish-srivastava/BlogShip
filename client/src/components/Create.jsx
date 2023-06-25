import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/context";

const Create = () => {
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate()
  const {userInfo} = useBlogContext()

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("descp", descp);
    formData.set("file", file);
    try {
      const response = await fetch("http://localhost:4000/post",{
        method:"POST",
        body: formData,
        credentials: 'include'
    })

    if(response.ok){
        navigate(`/${userInfo?.username}/${userInfo?.id}`)
    }
  }
     catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="create-container">
      <input
      autoFocus
      required
        type="text"
        placeholder="Give a Title to your Blog..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{fontSize : "1.8rem"}}
      />

      <input type="text" style={{fontSize : "1.1rem"}} required placeholder="Give a lil Description" value={descp}
        onChange={(e) => setDescp(e.target.value)} />

        <textarea placeholder="Start Writing..." />

      <div className="file">
        <input
          required          
          type="file"
          placeholder="Add a cover photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </main>
  );
};

export default Create;
