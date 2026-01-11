import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar"; // your existing client navbar

export default function ClientLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
