import { NavLink, useNavigate } from "react-router";
import { useState} from "react";
import { loginAPI } from "../../fireBase/auth";
import { Input } from "../../utils/input/Input";

import styles from "./../login/Login.module.scss";


export const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [remember, setRemember] = useState(!false)


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
