import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

type TUserInput = {
  full_name: string;
  email: string;
  password: string;
  department: string;
  designation: string;
  confirmPassword: string;
};

export default function SignUp() {
  const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
  const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [userInput, setUserInput] = useState({
    designation: "Full Time",
  } as TUserInput);

  const navigate = useNavigate();

  const getUserId = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: userInput.email,
      password: userInput.password,
    });
    try {
      if (data.user) {
        return data.user.id;
      }
    } catch (error) {
      console.log(error);
    }
    alert(error);
  };

  const signUpHandler = async (userid: string) => {
    if(userInput.password===userInput.confirmPassword&&userInput.department&&userInput.full_name&&userInput.designation&&userInput.email){
      const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: userInput.full_name,
        email: userInput.email,
        password: userInput.password,
        department: userInput.department,
        designation: userInput.designation,
      })
      .match({ id: userid });
      console.log(data);
      try {
        alert("success");
        navigate("/login");
        return data;
      } catch (error) {
        console.log(error);
      }
      alert(error);
    }
    else if(!userInput.email.includes("@")){
      alert("Please enter a valid email")
    }
    else{
      alert("Password does not match")
    }
    };

  const submitHandler = async () => {
    try {
      const userId = await getUserId();
      if (userId) signUpHandler(userId);
    } catch (error) {
      console.log(error);
    }
  };

  const fullNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, full_name: e.target.value }));
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, password: e.target.value }));
  };

  const confirmPasswordChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInput((prev) => ({ ...prev, confirmPassword: e.target.value }));
  };

  const departmentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, department: e.target.value }));
  };

  const designationChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserInput((prev) => ({ ...prev, designation: e.target.value }));
  };
  return (
    <>
      <h1>Sign Up</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div style={{ margin: 4 }}>
            <label htmlFor="fullname" /> Name:
            <input
              type="text"
              style={{ marginLeft: 2 }}
              onChange={fullNameChangeHandler}
            />
          </div>
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
          <div style={{ margin: 4 }}>
            <label htmlFor="confirm-password" /> Confirm Password:
            <input
              type="password"
              style={{ marginLeft: 2 }}
              onChange={confirmPasswordChangeHandler}
            />
          </div>
          <div style={{ margin: 4 }}>
            <label htmlFor="department" /> Department:
            <input
              type="text"
              style={{ marginLeft: 2 }}
              onChange={departmentChangeHandler}
            />
          </div>
          <div style={{ margin: 4 }}>
            <label htmlFor="designation" />
            Designation:
            <select
              style={{ marginBottom: 8, marginLeft: 2 }}
              onChange={designationChangeHandler}
            >
              <option value="Full Time">FullTime</option>
              <option value="Part Time">PartTime</option>
              <option value="Intern">Intern</option>
            </select>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
