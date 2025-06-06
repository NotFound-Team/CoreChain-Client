import { Box, CircularProgress, Modal } from "@mui/material";

const SpinnerModal = () => {
  return (
    <>
      <Modal
        open={true}
        sx={{
          width: "100%",
          height: "100%",
          zIndex: 2000,
        }}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </>
  );
};

export default SpinnerModal;
