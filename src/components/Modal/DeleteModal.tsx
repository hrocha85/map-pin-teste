import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface DeleteModalProps {
  open: boolean;
  title: string;
  button: string;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal = ({
  open,
  title,
  button,
  handleClose,
  handleDelete,
}: DeleteModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 500,
    overflowY: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleActionDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
          }}
        >
          <Close />
        </IconButton>

        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h6" component="h2">
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Esta ação é permanente e não pode ser desfeita.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={handleActionDelete}
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {button}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
