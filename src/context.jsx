// import { createContext, useContext, useEffect } from "react";
// import UseFetch from "./hooks/use-fetch";
// import { getCurrentUsers } from "./db/apiAuth";

// const UrlContext = createContext();

// const UrlProvider = ({ children }) => {

//     //fetching current user
//     const {data: user, loading, execute : fetchUser} = UseFetch(getCurrentUsers)

//     //check authentication
//     const isAuthenticated = user?.role === 'authenticated';

//     useEffect( () => {
//         fetchUser()
//     },[]);

//   return <UrlContext.Provider value={{user,fetchUser,isAuthenticated,loading}}>{children}</UrlContext.Provider>;
// };
// export const UrlState = () => {

//  return useContext(UrlContext);
// }
// export default UrlProvider;


import { createContext, useContext, useEffect, useState } from "react";
import UseFetch from "./hooks/use-fetch";
import { getCurrentUsers } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { data: user, loading, execute: fetchUser } = UseFetch(getCurrentUsers);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading) {
            setIsAuthenticated(user?.role === 'authenticated');
        }
    }, [user, loading]);

    return (
        <UrlContext.Provider value={{ user, fetchUser, isAuthenticated, loading }}>
            {children}
        </UrlContext.Provider>
    );
};

export const UrlState = () => {
    return useContext(UrlContext);
};

export default UrlProvider;
