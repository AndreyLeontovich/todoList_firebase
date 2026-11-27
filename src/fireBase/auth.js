import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged, 
    getAuth 
} from "firebase/auth";

import { AUTH } from "./fireBase";

export const registrationAPI = async (email, password) => {
    try {
        const responseUser = await createUserWithEmailAndPassword(AUTH, email, password)
        return {ok: true, data: responseUser}
    } catch (error) {
        console.log(error);
        return {ok: false, text: error.message} 
    }
}

export const loginAPI = async (user) => {
    try {
        await setPersistence(AUTH, browserLocalPersistence);
        const responseUser = await signInWithEmailAndPassword(AUTH, user.email, user.password)
        return {ok: true, data: responseUser}
    } catch(e) {
        console.log(e);
        return {ok: false, text : e.message}
    }
}

export const loginOut = () => signOut(AUTH)

export const checkAuthAPI = (callback) => {
    return onAuthStateChanged(AUTH, callback);
};

