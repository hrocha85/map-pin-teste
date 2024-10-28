import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          404 - Not Found
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          A página que você está procurando não existe.
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} component={Link} to={"/"}>
          Voltar
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
