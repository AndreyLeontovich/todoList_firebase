import React from "react";
import { useState } from "react";
import { NavLink } from "react-router";


import { registrationAPI } from "../../fireBase/auth";
import { createUserAPI } from "../../fireBase/userAPI";

import styles from "./../registration/Registration.module.scss";

import { Input } from "../../utils/input/Input";

export const Registration = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTerms, setIsTerms] = useState(false);


  const registration = async () => {
    if (!name.trim() || !email.trim()) {
      console.log("Fill in all fields");
      return;
  }

  if (password.length < 8) {
      console.log("Password is too short");
      return;
  }

  if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
  }

  if (!isTerms) {
      console.log("Accept Terms & Conditions");
      return;
  }





// ! Создаём аккаунт в Firebase Authentication ==========================================================================

    const response = await registrationAPI(email, password)
    if (!response.ok) { 
      console.log(response.text);
      return
    }


   
//! 2. Формируем данные пользователя ==========================================================================


    const newUser = {
      name: name,
      email: response.data.user.email,
      uid: response.data.user.uid
    };

//! 3. Создаём документ в Firestore ==========================================================================


    const responseTwo = await createUserAPI(newUser)
    // const responseThree = await createNewTodoListAPI(newUser.uid, )
    if (!responseTwo.ok) {
      console.log(responseTwo.text);
      return
    }

    // if (!responseThree.ok) {
    //   console.log(responseThree.text);
    //   return
    // }
  };

  return (
    <section className={styles.registration}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create account</h1>

          <p className={styles.subtitle}>Enter your details to get started</p>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <h3>Full name</h3>

            <Input
              value={name}
              setValue={setName}
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              required="required"
            />
          </div>

          <div className={styles.field}>
            <h3>Email address</h3>
            <Input
              value={email}
              setValue={setEmail}
              type="email"
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
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required="required"
            />
          </div>

          <div className={styles.field}>
            <h3>Confirm password</h3>
            <Input
              value={confirmPassword}
              setValue={setConfirmPassword}
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required="required"
            />
          </div>

          <div className={styles.checkbox}>
            <Input
              value={isTerms}
              setValue={() => setIsTerms(prev => !prev)}
              type="checkbox"
              required="required"
            />

            <h4>
              I agree to the <a href="/terms">Terms & Conditions</a>
            </h4>
          </div>

          <button className={styles.button} onClick={registration}>
            Create account
          </button>
        </div>

        <div className={styles.footer}>
          <p>
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};
