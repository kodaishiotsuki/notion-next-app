import Link from "next/link";
import React, { FC } from "react";
import { LayoutProps } from "../types/types";
import { Footer } from "./Footer";
import NavBar from "./NavBar";



const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {/*  */}
        <NavBar />
        {/*  */}
        <main className="w-full pb-12 px-4">{children}</main>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
