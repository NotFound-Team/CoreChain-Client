"use client";

import React from "react";

export default function ContractsLayout({ children, detail }: { children: React.ReactNode; detail: React.ReactNode }) {

  return (
    <>
      {children}
      {detail}
    </>
  );
}
