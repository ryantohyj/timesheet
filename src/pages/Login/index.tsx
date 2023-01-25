import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
type TUserInput = {
  email: string;
  password: string;
};

type TProp = {
  setIsLogin: (x: boolean) => void;
};
export default function Login({ setIsLogin }: TProp) {
  const [userInput, setUserInput] = useState({} as TUserInput);
  const navigate = useNavigate();

  const getPassword = async (email: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("password")
      .eq("email", email);

    return data;
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, password: e.target.value }));
  };

  const loginHandler = async () => {
    const password = await getPassword(userInput.email);
    if (password?.length === 0) {
      alert("Wrong Email");
    } else if (password?.[0].password !== userInput.password) {
      alert("Wrong Password");
    } else {
      sessionStorage.setItem("email", userInput.email);
      alert("success");
      setIsLogin(true);
      navigate("/");
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div style={{ margin: 4 }}>
            <label htmlFor="email" />
            Email:
            <input
              type="email"
              style={{ marginLeft: 2 }}
              onChange={emailChangeHandler}
            />
          </div>
          <div style={{ margin: 4 }}>
            <label htmlFor="password" /> Password:
            <input
              type="password"
              style={{ marginLeft: 2 }}
              onChange={passwordChangeHandler}
            />
          </div>
        </div>

        <button onClick={loginHandler}>Login</button>
      </div>
    </>
  );
}
