import { NavLink, useNavigate } from "react-router";
import { useState} from "react";
import { useUser } from "../../context/userContext"; 

import { loginAPI } from "../../fireBase/auth";
import { getUserAPI } from "../../fireBase/userAPI";
import { getTodoListAPI } from "../../fireBase/userAPI";


import styles from "./../login/Login.module.scss";
import React from "react";

import { Input } from "../../utils/input/Input";

export const Login = () => {

  const {loginUserAuth} = useUser()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [remember, setRemember] = useState(!false)

const navigate = useNavigate()


const login = async () => {
    const user = {
        email,
        password,
        remember
    }

    const response = await loginAPI(user)
    if (!response.ok) {
      console.log('Login Error', response.text);
      return
    }

    const uid = response.data.user.uid

    const responseTwo = await getUserAPI(uid)
    if (!responseTwo.ok) {
      console.log('Login Error', response.text);
      return
    }

    const responseThree = await getTodoListAPI(uid);
    if (!responseThree.ok) {
      console.log("TodoList Error:", responseThree.text);
      return;
    }
    
    const userDatas = {
      name: responseTwo.data.name,
      email:  responseTwo.data.email
    }
    
    const userTodoList = responseThree.data.todoList


    loginUserAuth(userDatas, userTodoList)
    console.log('Account created success!', responseTwo.data);
    navigate('/home')
}


  return (
    <section className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>

          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <h3>Email address</h3>

            <Input
              value={email}
              setValue={setEmail}
              type="text"
              placeholder="Enter your email"
              autoComplete="email"
              required="required"
            />
          </div>

          <div className={styles.field}>
            <h3>Password</h3>

            <Input
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required="required"
            />

          </div>

          <div className={styles.options}>
            <div className={styles.checkbox}>
            <Input
              value={remember}
              setValue={() => setRemember(!remember)}
              type="checkbox"
            />
            

              <label htmlFor="remember">Remember me</label>
            </div>

            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button onClick={login} className={styles.button}>
            Sign in
          </button>
        </div>

        <div className={styles.footer}>
          <p>
            Don't have an account? <NavLink to="/">Sign up</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};
