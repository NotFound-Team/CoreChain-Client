"use client";

import React, { useEffect, useState } from "react";
import { BASE_URL, CONFIG_API } from "@/configs/api";
import UserDetails from "@/components/UserDetails";
import { UserResponse } from "@/types/user";
import fetchApi from "@/utils/fetchApi";
import { CircularProgress, Box, Alert } from "@mui/material";

type TProps = {
  params: Promise<{ userId: string }>;
};

export default function PageUser({ params }: TProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { userId } = await params;

        const response = await fetchApi(`${CONFIG_API.USER.DETAIL(userId)}`, "GET");

        if (response && response.data) {
          setUser(response.data);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return user ? <UserDetails user={user} /> : null;
}
