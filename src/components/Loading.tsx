import { Backdrop, CircularProgress, Typography } from "@mui/material";

export default function Loading({ open, message = "Loading..." }: { open: boolean; message: string }) {
  return (
    <Backdrop open={open} className="flex justify-center items-center z-50 bg-black bg-opacity-60">
      <div className="text-center">
        <CircularProgress size={60} color="secondary" />
        <Typography variant="h6" className="mt-4 text-white text-lg">
          {message}
        </Typography>
      </div>
    </Backdrop>
  );
}
