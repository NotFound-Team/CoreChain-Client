import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

export default function Loading({ open, message = "Loading..." }: { open: boolean; message?: string }) {
  const theme = useTheme();
  
  return (
    <Backdrop 
      open={open} 
      sx={{
        zIndex: theme.zIndex.modal + 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "dark" 
            ? "rgba(47, 51, 73, 0.9)" 
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: theme.shadows[8],
        }}
      >
        <CircularProgress 
          size={56} 
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 2.5,
            color: theme.palette.text.primary,
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}

