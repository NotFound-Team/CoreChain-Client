// hooks/useSnackbar.ts
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Severity = "success" | "error" | "warning" | "info";

export const useSnackbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<Severity>("success"); // 'success', 'error', 'warning', 'info'

  const showToast = (msg: string, type: Severity = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const hideToast = () => setOpen(false);

  const Toast = () => (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideToast}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        marginTop: "20px",
        "& .MuiSnackbar-root": {
          top: "24px !important",
        },
      }}
    >
      <Alert severity={severity} onClose={hideToast} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { Toast, showToast };
};
