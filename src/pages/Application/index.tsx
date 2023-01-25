import { useState } from "react";
export type TUserInput = {
  startDate: string;
  endDate: string;
  reason: string;
  hours: number;
  type: string;
};

export type TProps = {
  updateConfirm: () => void;
  submitHandler: () => void;
  userInput: TUserInput;
};

import { useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SOME_KEY1;
const supabaseAnonKey = import.meta.env.VITE_SOME_KEY2;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function ConfirmPopup({ updateConfirm, submitHandler, userInput }: TProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <p>{userInput.startDate}</p>
      <span style={{ marginLeft: 8, marginRight: 8 }}>to</span>
      <p>{userInput.endDate}</p>

      <p>Reason: {userInput.reason}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={submitHandler} style={{ marginRight: 10 }}>
          Confirm
        </button>
        <button onClick={updateConfirm}>Cancel</button>
      </div>
    </div>
  );
}

export default function Application() {
  const [userInput, setUserInput] = useState({ type: "Leave" } as TUserInput);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();
  const EMAIL = sessionStorage.getItem("email");

  const submitHandler = async () => {
    if (
      userInput.startDate &&
      userInput.endDate &&
      userInput.reason &&
      userInput.type
    ) {
      const { error } = await supabase.from("leave").insert({
        created_by: EMAIL,
        start_date: userInput.startDate,
        end_date: userInput.endDate,
        reason: userInput.reason,
        type: userInput.type,
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
    setUserInput((prev) => ({ ...prev, reason: e.target.value }));
  };

  const choiceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserInput((prev) => ({ ...prev, type: e.target.value }));
  };

  const updateConfirm = () => {
    setConfirm(!confirm);
  };
  return (
    <>
      <h2>Application</h2>
      {confirm === false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="choice" />
          <select style={{ marginBottom: 8 }} onChange={choiceChangeHandler}>
            <option value="Leave">Leave</option>
            <option value="Medical Leave">MC</option>
          </select>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div>
              <label htmlFor="start-date" />
              <input type="date" onChange={startDateChangeHandler} />
            </div>

            <pre style={{ marginLeft: 5, marginRight: 5 }}>To</pre>

            <div>
              <label htmlFor="end-date" />
              <input type="date" onChange={endDateChangeHandler} />
            </div>
          </div>

          <div>
            <h3>Reason:</h3>
            <label htmlFor="reason-text" />
            <input
              style={{
                height: 60,
                inlineSize: 300,
              }}
              type="textArea"
              required={true}
              onChange={inputChangeHandler}
            />
          </div>

          <button style={{ marginTop: 15 }} onClick={updateConfirm}>
            Submit
          </button>
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
