import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

type TProps = {
  deleteDialogOpen: boolean;
  handleCancelDelete: () => void;
  titleConfirmDelete: string;
  descriptionConfirmDelete: string;
  handleConfirmDelete: () => void;
};

const ConfirmDelete = (props: TProps) => {
  const { deleteDialogOpen, descriptionConfirmDelete, handleCancelDelete, handleConfirmDelete, titleConfirmDelete } =
    props;

  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={handleCancelDelete}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography sx={{ fontWeight: 600 }}>{titleConfirmDelete}</Typography>
      </DialogTitle>
      <DialogContent>
        <Alert
          severity="warning"
          sx={{
            mt: 2,
            borderRadius: 2,
          }}
        >
          {descriptionConfirmDelete}
        </Alert>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleCancelDelete}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
