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
   checkAuthAPI(async (firebaseUser) => {

      setLoading(true);

      try {
        if (firebaseUser) {
          const uid = firebaseUser.uid;
          const response = await getUserAPI(uid);
          const responseTwo = await getTodoListAPI(uid);
        
          console.log(response.data);
          console.log(responseTwo.data);

          if (response.ok && responseTwo.ok) {
            setUser({
                name: response.data.name,
                email: response.data.email,
                uid
              });
            setTodo(responseTwo.data ?? [])
          } else {
            console.log("Ошибка загрузки данных");
          }
        } else {
          setUser(null);
          setTodo([]);
        }
      } catch (error) {
          console.log("Ошибка:", error);
      } 

      setLoading(false);
    });
  }, []);

  //? Регистрация и авторизация

  const registerUserAuth = (user, todo) => {
    setUser(user);
    setTodo(todo);
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
    updateUserTodoList,
  };
}

export const useUser = () => useContext(UserContext);
