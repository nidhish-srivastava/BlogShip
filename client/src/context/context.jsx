import { createContext, useContext, useState } from "react";
import a from '../1.jpg'

const BlogContext = createContext()

export const useBlogContext = () => useContext(BlogContext)

export const BlogProvider = ({children}) =>{
    const [userInfo,setUserInfo] = useState({})
    const [dp,setDp] = useState(a)

    const final = {
        userInfo,setUserInfo,
        dp,setDp
    }
    return(
        <BlogContext.Provider value={final}>
            {children}
        </BlogContext.Provider>
    )
}

