import { useState } from "react";
import Calendar from "react-calendar";

import { createClient } from "@supabase/supabase-js";

import Details from "../../components/Details";

export type TWorkDetail = {
  created_by: TCreated_By;
  date: string;
  start_time: string;
  end_time: string;
  project: string;
  hours: number;
  id: string;
};

type TCreated_By = {
  full_name: string;
};

const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export default function Home() {
  const [value, setValue] = useState(new Date());
  const [workDetail, setWorkDetail] = useState<TWorkDetail[]>([]);
  const date = value;

  const day = padTo2Digits(date.getDate());
  const month = padTo2Digits(date.getMonth() + 1);
  const year = date.getFullYear();

  const currentDate = `${day}-${month}-${year}`;

  const submitHandler = async () => {
    const { data } = await supabase
      .from("timesheet")
      .select("*,created_by(full_name)")
      .eq("date", `${year}-${month}-${day}`);
    try {
      if (data) setWorkDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Calendar onChange={setValue} value={value} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{currentDate}</h1>
        <button onClick={submitHandler} style={{ marginLeft: 10 }}>
          Search
        </button>
      </div>
      <Details workDetail={workDetail} />
    </div>
  );
}
