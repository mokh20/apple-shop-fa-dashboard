import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { t } = useTranslation("auth");
  const storedUser = localStorage.getItem("userData");

  const [userData, setUserData] = useState(
    storedUser ? JSON.parse(storedUser) : []
  );
  const getSessionId = () => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID(); // generates unique ID
      localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  };
  // Sign Up New User
  async function signUp({
    userName,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
  }) {
    const { data } = await supabase.from("usersInfo").select("*");
    const emailInUse = data.find((data) => data.email === email);
    const userInUse = data.find((data) => data.userName === userName);
    // error toast auth
    userInUse && toast.error(t("errors.userNameInUse"));
    emailInUse && toast.error(t("errors.emailInUse"));
    password.length < 6 && toast.error(t("errors.passwordInUse"));
    // clear input in auth
    if (userInUse || emailInUse || password.length < 6) {
      setUserName("");
      setEmail("");
      setPassword("");
    } else {
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

        userData && userData.length > 0
          ? setUserData((prev) => [...prev, ...(data ?? [])])
          : setUserData([...data]);
        transferCartToUser(data.id);
        await signIn(email, password);
        if (error) {
          return { success: false, error };
        }
        return { success: true, data };
      } catch (error) {
        throw new Error(error);
      }
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
      const { password: _discardPassword, ...localData } = data;
      localStorage.setItem("userData", JSON.stringify(localData));
      setUserData(data);
      transferCartToUser(data.id);
      return { success: true };
    } catch (error) {
      console.error("an error occurred: ", error);
    }
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  //   Sign out
  const signOut = () => {
    localStorage.removeItem("userData");
    setUserData("");
    window.location.reload();
  };
  // transfer cart from guest to user
  async function transferCartToUser(userId) {
    const sessionId = getSessionId();
    // transfer rows
    const { error } = await supabase
      .from("cart")
      .update({ user_id: userId, session_id: null })
      .eq("session_id", sessionId);

    if (error) console.error("Cart transfer error:", error);
  }
  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
