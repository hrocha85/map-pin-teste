import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
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
          Bem-vindo!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Escolha uma opção abaixo para começar.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            component={Link}
            to="/sign-in"
            fullWidth
          >
            Fazer Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/sign-up"
            fullWidth
          >
            Cadastrar-se
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
