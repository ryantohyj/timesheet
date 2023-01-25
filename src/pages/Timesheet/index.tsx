import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type TUserTimeSheetInput = {
  projectName: string;
  startDate: string;
  endDate: string;
};
type TProps = {
  updateConfirm: () => void;
  submitHandler: () => void;
  userInput: TUserTimeSheetInput;
};
function ConfirmPopup({ updateConfirm, submitHandler, userInput }: TProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h3>Project: {userInput.projectName}</h3>
        <div>
          <p>
            {userInput.startDate.slice(0, 10)}
            <span style={{ marginLeft: 20, marginRight: 20 }}>
              {userInput.startDate.slice(11)}
            </span>
          </p>
        </div>
        <p>To</p>
        <div>
          <p>
            {userInput.endDate.slice(0, 10)}
            <span style={{ marginLeft: 20, marginRight: 20 }}>
              {userInput.endDate.slice(11)}
            </span>
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={submitHandler} style={{ marginRight: 15 }}>
          Confirm
        </button>
        <button onClick={updateConfirm}>Cancel</button>
      </div>
    </div>
  );
}
export default function Timesheet() {
  const [userInput, setUserInput] = useState({} as TUserTimeSheetInput);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const EMAIL = sessionStorage.getItem("email");

  const submitHandler = async () => {
    const date = userInput.startDate.slice(0, 10);
    const startTime = userInput.startDate.slice(11);
    const endTime = userInput.endDate.slice(11);
    const hoursWorked = parseInt(endTime) - parseInt(startTime);
    if (userInput.startDate && userInput.endDate && userInput.projectName) {
      const { error } = await supabase.from("timesheet").insert({
        project: userInput.projectName,
        date: date,
        start_time: startTime,
        end_time: endTime,
        created_by: EMAIL,
        hours: hoursWorked,
      });
      navigate("/");
      console.log(error);
    }
  };

  const startDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, startDate: e.target.value }));
  };
  const endDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, endDate: e.target.value }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, projectName: e.target.value }));
  };

  const updateConfirm = () => {
    setConfirm(!confirm);
  };

  return (
    <>
      <h2>TimeSheet</h2>
      {confirm === false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <label style={{ marginRight: 8 }}>Project name:</label>
            <input
              type="text"
              name="project-name"
              onChange={inputChangeHandler}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ marginRight: 8 }}>Start Time:</label>
            <input
              type="datetime-local"
              name="start-time"
              onChange={startDateChangeHandler}
            />
          </div>
          <div style={{ marginBottom: 30 }}>
            <label style={{ marginRight: 8 }}>End Time:</label>
            <input
              type="datetime-local"
              name="end-time"
              onChange={endDateChangeHandler}
            />
          </div>

          <button onClick={updateConfirm}>Submit</button>
        </div>
      ) : (
        <ConfirmPopup
          updateConfirm={updateConfirm}
          submitHandler={submitHandler}
          userInput={userInput}
        />
      )}
    </>
  );
}
