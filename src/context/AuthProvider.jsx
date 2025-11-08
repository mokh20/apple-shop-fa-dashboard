import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState([]);
  // Sign Up New User
  async function signUp({ userName, email, password }) {
    try {
      const newUser = {
        userName: userName,
        email: String(email),
        password: String(password),
      };
      const { data, error } = await supabase
        .from("usersInfo")
        .insert([newUser])
        .select("*");
      setUserInfo((prev) => [...prev, ...data]);
      await signIn(email, password);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      throw new Error(error);
    }
  }

  // Sign In user
  async function signIn(email, password) {
    try {
      const { data, error } = await supabase
        .from("usersInfo")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();
      if (!data) {
        return { success: false, error: error };
      }
      localStorage.setItem("user", JSON.stringify(data));
      setUserInfo(data);
      return { success: true };
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);
  //   Sign out
  const signOut = () => {
    localStorage.removeItem("user");
    setUserInfo("");
  };
  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
