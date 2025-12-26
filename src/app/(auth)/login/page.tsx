"use client";

// -- Next --
import { useRouter } from "next/navigation";
import Image from "next/image";

// -- MUI --
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

// -- Config
import { EMAIL_REG, PASSWORD_REG } from "@/configs/regex";

// -- Types --
import { UserLogin } from "@/types/auth";

// -- React-hook-form --
import { Controller, useForm } from "react-hook-form";

// -- hookform/resolvers/yup --
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// -- Hook
import { useAuth } from "@/hooks/useAuth";
// -- React --
import { useEffect, useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";
import { InputAdornment } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FallbackSpinner from "@/components/fall-back";

const schema = yup.object({
  username: yup
    .string()
    .required("The field is required")
    .matches(EMAIL_REG, "Invalid email. Please enter a valid email format."),
  password: yup
    .string()
    .required("The field is required")
    // .matches(PASSWORD_REG, "Password must be at least 8 characters, including uppercase and special characters."),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  // ** theme
  const theme = useTheme();
  const { login, user } = useAuth();

  const router = useRouter();

  const { Toast, showToast } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: { username: "", password: "" },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserLogin) => {
    setLoading(true);
    try {
      await login(data);
      showToast("Login successfully!", "success");
      await router.push("/dashboard");
    } catch (error) {
      showToast("Incorrect username or password!", "error");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token && user?.token && user) {
        await router.push("/dashboard");
      }
      setLoading(false);
    };
    router.prefetch("/dashboard");
    checkToken();
  }, [router, user]);

  return (
    <>
      {loading && <FallbackSpinner />}
      <Toast />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          padding: "40px",
        }}
        className="flex-center bg-[#EFF6FF]"
      >
        <CssBaseline />
        <Box className="hidden md:block w-[35%]">
          <Image
            src="/images/block.png"
            width={500}
            height={500}
            className="w-full object-cover"
            alt="Block"
            priority
          />
        </Box>

        {/* Form */}
        <Box className="flex-1 flex items-center justify-center">
          <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", maxWidth: 700 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 48,
                color: theme.palette.text.secondary,
              }}
              variant="h5"
              textAlign="center"
              gutterBottom
            >
              LOGIN
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 2 }}>
                Login
              </Button>
              <Typography sx={{ textAlign: "center", mt: 2, mb: 2, color: theme.palette.text.primary }}>OR</Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px " }}>
                <IconButton sx={{ color: "#497ce2" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    fontSize="1.375rem"
                    className="iconify iconify--mdi"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"
                    ></path>
                  </svg>
                </IconButton>
                <IconButton sx={{ color: theme.palette.error.main }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    fontSize="1.375rem"
                    className="iconify iconify--mdi"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                    ></path>
                  </svg>
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
