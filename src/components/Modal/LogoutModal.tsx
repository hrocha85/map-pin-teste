import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { logoutUser } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  open: boolean;
  handleClose: () => void;
}

const LogoutModal = ({ open, handleClose }: LogoutModalProps) => {
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

  const handleLogout = () => {
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
            Tem certeza de que deseja sair da conta?
          </Typography>

          <Box display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                flexGrow: 1,
                marginRight: 1,
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                flexGrow: 1,
                marginLeft: 1,
              }}
            >
              Deslogar da conta
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
