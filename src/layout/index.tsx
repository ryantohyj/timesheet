import { Outlet } from "react-router-dom";

import Navbar, { TProps } from "../components/Navbar";

export default function Layout({ isLogin, setIsLogin }: TProps) {
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <Outlet />
    </main>
  );
}
