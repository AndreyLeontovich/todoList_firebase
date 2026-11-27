import { doc, getDoc, getDocs, setDoc, updateDoc, collection, deleteDoc } from "firebase/firestore";
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

    if (!response.exists()) {return { ok: false, text: "User does not exist"};}

    return {
      ok: true,
      data: {
        ...response.data(),
        uid: response.id,
      },
    };
  } catch (e) {
    return {ok: false,text: e.message,};
  }
};


export const createNewTodoListAPI = async (uid, id, data) => {
  try {
    const link = doc(DB, "todoList", uid, 'todos', id); 
    await setDoc(link, data);
    return { ok: true, data: {...data, id} };
  } catch (e) {
    return { ok: false, text: e.message };
  }
};


export const getTodoListAPI = async (uid) => {
  try{
    const link = collection(DB, "todoList", uid, "todos");
    const response = await getDocs(link);
    const data = response.docs.map(item => ({
      ...item.data(),
      id: item.id
    }));
    return { ok: true, data: data };
  } catch (e) {
    console.log(e.message);
    return { ok: false, text: e.message };
  }
}



export const deleteTodoAPI  = async (id) => {
  try {
    const uid = AUTH.currentUser?.uid;

    if (!uid) {
      return {
        ok: false,
        text: "User is not authenticated"
      };
    }
    const link = doc(DB, "todoList", uid, "todos", id);
    await deleteDoc(link);
    return { ok: true, id };
  } catch (error) {
    return { ok: false, text: error.message };
  }
};

export const updateTodoListAPI = async (id, data) => {
  try {
    const uid = AUTH.currentUser?.uid;

    if (!uid) {
      return {
        ok: false,
        text: "User is not authenticated"
      };
    }
    const link = doc(DB, "todoList", uid, "todos", id);
    await updateDoc(link, data);
    return { ok: true, data: { ...data, id } };
  } catch (error) {
    return { ok: false, text: error.message };
  }
};








