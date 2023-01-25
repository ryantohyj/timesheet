/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type TUser = {
  avatar_url: string;
  department: string;
  designation: string;
  full_name: string;
  id: string;
  updated_at: string;
  username: string;
};

export default function Profile() {
  const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
  const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const EMAIL = sessionStorage.getItem("email");

  const [user, setUser] = useState({} as TUser);
  const [monthInput, setMonthInput] = useState("");
  const [hoursWorked, setHoursWorked] = useState();
  const [application, setApplication] = useState<any[]>([]);
  const [, monthInName] = monthInput.split("-");

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthInput(e.target.value);
    const { data } = await supabase
      .from("timesheet")
      .select("hours")
      .eq("created_by", EMAIL) //user
      .ilike("date", `%${e.target.value}%`);
    try {
      const hours = data
        ?.map((x) => x.hours)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setHoursWorked(hours);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", EMAIL); //the username

    if (error !== null) {
      throw new Error("Could not fetch size data");
    }
    return data[0];
  };

  const getUser = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchApplication = async (type: string) => {
    const { data } = await supabase
      .from("leave")
      .select()
      .eq("created_by", EMAIL) //user
      .eq("type", type);
    try {
      console.log(data);
      if (data) setApplication(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      Profile Page
      <div>
        <h1>{user?.full_name}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ marginRight: 20 }}>
            Department:
            <span>{user?.designation}</span>
          </p>
          <p style={{ marginLeft: 20 }}>
            Designation:
            <span>{user?.department}</span>
          </p>
        </div>
        <label htmlFor="month" />
        <input onChange={changeHandler} type="month" />

        <div>
          <h1>Hours worked {monthNames[parseInt(monthInName) - 1]} </h1>
          <h1>{hoursWorked} Hours</h1>
        </div>
      </div>
      <div>
        <h1>Leave and MC</h1>
        <button onClick={() => fetchApplication("Medical Leave")}>
          Medical
        </button>
        <button onClick={() => fetchApplication("Leave")}>Leave</button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {application.map((x) => (
            <div key={x.id} style={{ borderBottom: "2px solid blue" }}>
              <h3>{x.type}</h3>
              <h4>Reason: {x.reason}</h4>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ marginRight: 5 }}>{x.start_date}</p>
                <p>-</p>
                <p style={{ marginLeft: 5 }}>{x.end_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
