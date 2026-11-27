import { Routes, Route, Navigate } from "react-router";
import { useUser } from "../../context/userContext";
import { checkAuthAPI } from "../../fireBase/auth";

import React from "react";

import { Login } from "../login/Login";
import { Registration } from "../registration/Registration";
import { Home } from "../home/Home";
import { Redirect } from "../Redirect/Redirect";

export const AppRoutes = () => {
  const { user, loading } = useUser();
  console.log("Current user:", user);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Redirect typePage={'/'} />}/>
        </>
      ) : (
        <>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Redirect typePage={'/registration'}/>}/>
        </>
      )}

    </Routes>
  );
};
// /ыфвыфвфв

// Home
// Login regist
