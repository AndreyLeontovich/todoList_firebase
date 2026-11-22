import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AUTH, DB } from "./fireBase";

export const createUserAPI = async (user) => {
  try {
    const link = doc(DB, "users", user.uid);
    const data = {
      name: user.name,
      email: user.email,
      uid: user.uid,
    };
    await setDoc(link, data);
    return { ok: true, data: data };
  } catch (e) {
    return { ok: false, text: e.message };
  }
};

export const getUserAPI = async (uid) => {
  try {
    const link = doc(DB, "users", uid);
    const response = await getDoc(link);

    if (!response.exists()) {
      return {
        ok: false,
        text: "User does not exist",
      };
    }

    return {
      ok: true,
      data: {
        ...response.data(),
        uid: response.id,
      },
    };
  } catch (e) {
    return {
      ok: false,
      text: e.message,
    };
  }
};



export const createTodoListAPI = async (user) => {
  try {
    const link = doc(DB, "todoList", user.uid);
    const data = {
      todoList: []
    };
    
    await setDoc(link, data);
    return { ok: true, data: data };
  } catch (e) {
    return { ok: false, text: e.message };
  }
};


export const getTodoListAPI = async (uid) => {
  try{
    const link = doc(DB, "todoList", uid);
    const response = await getDoc(link);
    return { ok: true, data: response.data() };
  } catch (e) {
    return { ok: false, text: e.message };
  }
}


export const updateTodoListAPI = async (todoList) => {

  

  try {

    const uid = AUTH.currentUser?.uid;

    if (!uid) {
      return {
        ok: false,
        text: "User is not authenticated"
      };
    }

    const link = doc(DB, "todoList", uid);
    await updateDoc(link, {todoList} );
    return { ok: true, data: todoList };
  } catch (error) {
    return { ok: false, text: error.message };
  }
};








