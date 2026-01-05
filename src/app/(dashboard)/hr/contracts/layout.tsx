"use client";

import React from "react";

export default function ContractsLayout({ children, detail }: { children: React.ReactNode; detail: React.ReactNode }) {
  console.log("RUN LAYOUT");

  return (
    <>
      {children}
      {detail}
    </>
  );
}
