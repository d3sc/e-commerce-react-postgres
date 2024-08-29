import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
// import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-16 md:ml-56">
        <Header />
        {children}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}
