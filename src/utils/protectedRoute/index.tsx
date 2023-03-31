import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../../services/LoginService';


const ProtectedRoute : React.FC<{children:any}> = (props)=>{
    const userlogg=isUserLoggedIn();

    
    if (!userlogg) {
        return <Navigate to="/login" replace />
      }
      return props.children
}

export default ProtectedRoute;