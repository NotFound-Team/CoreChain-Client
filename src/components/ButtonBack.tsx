"use client";

import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
  const router = useRouter();

  const handleBack = React.useCallback(() => {
    router.push("/user-management");
  }, [router]);
  return (
    <IconButton
      onClick={handleBack}
      sx={{
        // position: "absolute",
        // top: 16,
        // left: 16,
        marginTop: 1,
        marginLeft: 1,
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </IconButton>
  );
};

export default React.memo(ButtonBack);
