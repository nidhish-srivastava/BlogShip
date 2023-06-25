import { createContext, useContext, useState } from "react";

const BlogContext = createContext()

export const useBlogContext = () => useContext(BlogContext)

export const BlogProvider = ({children}) =>{
    const [userInfo,setUserInfo] = useState({})
    const final = {
        userInfo,setUserInfo
    }
    return(
        <BlogContext.Provider value={final}>
            {children}
        </BlogContext.Provider>
    )
}

