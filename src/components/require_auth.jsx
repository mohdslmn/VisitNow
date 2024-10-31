// import { UrlState } from '@/context';
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { BarLoader } from 'react-spinners';

// const RequireAuth = ({children}) => {
//     const navigate = useNavigate();
//    const {isAuthenticated, loading} = UrlState();
 
//     useEffect(() => {
//         if(!isAuthenticated && loading === false){
//             navigate("/auth")
//         }
//         if(loading) return <BarLoader width={"100%"} color='#36d7b7'></BarLoader>

//         if(isAuthenticated) return children;
        
//         },[isAuthenticated,loading,navigate])
// }

// export default RequireAuth

import { UrlState } from '@/context';
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const RequireAuth = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loading } = UrlState();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/auth", { state: { from: location } });
        }
    }, [isAuthenticated, loading, navigate, location]);

    if (loading) {
        return <BarLoader width={"100%"} color='#36d7b7' />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}

export default RequireAuth;
