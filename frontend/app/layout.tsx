"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <Provider store={store}>{children}</Provider>
    </body>
  </html>
);

export default Layout;
