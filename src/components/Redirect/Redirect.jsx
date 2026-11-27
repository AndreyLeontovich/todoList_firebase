import React from 'react'
import { Navigate } from 'react-router'

export const Redirect = ({typePage}) => {

 return <Navigate to={typePage} replace/>
}
