import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteUser, getInfoUser, logoutUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete?: any;
}

const DeleteModal = ({ open, handleClose, handleDelete }: DeleteModalProps) => {
  const navigate = useNavigate();

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

  const handleDelete2 = () => {
    const email = getInfoUser();
    deleteUser(email);
    logoutUser();
    navigate("/");
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
            Tem certeza de que deseja deletar sua conta?
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Esta ação é permanente e não pode ser desfeita.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            color="error"
            onClick={handleDelete}
            sx={{
              mt: 2,
              fontWeight: "bold",
            }}
          >
            DELETAR MINHA CONTA
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
