import Link from "next/link";
import React from "react";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {/*  */}
        <NavBar />
        {/*  */}
        <main></main>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
