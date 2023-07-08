import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/context";

const Create = () => {
  const [title, setTitle] = useState("");
  const [descp, setDescp] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const { userInfo } = useBlogContext();
  const [imagePreview,setImagePreview] = useState("")

  const changeHandlerForFileUpload = (e) =>{
    setFile(e.target.files[0])
    const file = e.target.files[0] 
    if(file){
      const reader = new FileReader()  // base64 format file reading
      //* base64 is a readable thing,from frontend to backend(we shud send image in base64 format)
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("descp", descp);
    formData.set("file", file);
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        navigate(`/my-blogs/${userInfo?.username}`);
      }
    } catch (error) {
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
        style={{ fontSize: "1.8rem" }}
      />

      <input
        type="text"
        style={{ fontSize: "1.1rem" }}
        required
        placeholder="Give a lil Description"
        value={descp}
        onChange={(e) => setDescp(e.target.value)}
      />

      <textarea placeholder="Start Writing..." />

      {imagePreview && <img className="img-preview" src={imagePreview}/>}
      <label for="file-upload" class="custom-file-upload">
        Choose a file
      </label>
      <input
        required
        id="file-upload"
        type="file"
        placeholder="Add a cover photo"
        onChange={changeHandlerForFileUpload}
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </main>
  );
};

export default Create;
