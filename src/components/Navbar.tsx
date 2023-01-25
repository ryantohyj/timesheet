import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export type TProps = {
  isLogin: boolean;
  setIsLogin: (x: boolean) => void;
};
export default function Navbar({ isLogin, setIsLogin }: TProps) {
  useEffect(() => {
    const EMAIL = sessionStorage.getItem("email");
    if (EMAIL !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const removeSessionStorage = () => {
    sessionStorage.removeItem("email");
    setIsLogin(false);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: 10,
        marginBottom: 30,
      }}
    >
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/application"}>Apply Leave/MC</NavLink>
      <NavLink to={"/timesheet"}>TimeSheet</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>

      {isLogin === true ? (
        <NavLink to={"/"} onClick={removeSessionStorage}>
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/signup"}>Sign up</NavLink>
        </>
      )}
    </div>
  );
}
