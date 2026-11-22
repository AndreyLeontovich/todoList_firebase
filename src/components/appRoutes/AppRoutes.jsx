import { Routes, Route, Navigate } from 'react-router'
import { useUser } from '../../context/userContext'
import { checkAuthAPI } from '../../fireBase/auth'

import React from 'react'



import { Login } from '../login/Login' 
import { Registration } from '../registration/Registration' 
import { Home } from '../home/Home'


export const AppRoutes = () => {

  
  const { user, loading } = useUser()
  console.log("Current user:", user);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {!user && (
        <>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Navigate to='/login' replace />} />
        </>
      )}

      {user && (
        <>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/login' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
        </>
      )}
    </Routes>
  );
};
