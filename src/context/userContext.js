import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthAPI } from "../fireBase/auth";

import { getUserAPI, getTodoListAPI } from "../fireBase/userAPI";

export const UserContext = createContext();

export function useUserState() {
  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuth = !!user;

  useEffect(() => {
    let active = true;
    let requestId = 0;

    const unsubscribe = checkAuthAPI(async (firebaseUser) => {
      const currentRequest = ++requestId;

      setLoading(true);

      try {
        if (firebaseUser) {
          const uid = firebaseUser.uid;

          const response = await getUserAPI(uid);
          const responseTwo = await getTodoListAPI(uid);

          if (!active || currentRequest !== requestId) return;

          if (response.ok && responseTwo.ok) {
            loginUserAuth(
              {
                name: response.data.name,
                email: response.data.email,
              },
              responseTwo.data?.todoList ?? []
            );
          } else {
            console.log("Ошибка загрузки данных");
          }
        } else {
          setUser(null);
          setTodo([]);
        }
      } catch (error) {
        if (active && currentRequest === requestId) {
          console.log("Ошибка:", error);
        }
      } finally {
        if (active && currentRequest === requestId) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      requestId++;
      unsubscribe();
    };
  }, []);

  //? Регистрация и авторизация

  const registerUserAuth = (user, todo) => {
    setUser(user);
    setTodo(todo);
  };
  const loginUserAuth = (user, todo) => {
    setTodo(todo);
    setUser(user);
  };

  //? Обновление TodoList

  const updateUserTodoList = (todoList) => {
    setTodo([...todoList]);
  };

  return {
    user,
    loading,
    todo,
    isAuth,
    registerUserAuth,
    loginUserAuth,
    updateUserTodoList,
  };
}

export const useUser = () => useContext(UserContext);
