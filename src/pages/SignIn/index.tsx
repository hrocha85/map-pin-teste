import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setLoggedInUser } from "../../utils/localStorage";
import bcrypt from "bcryptjs";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = getUser(email);

    if (!user) {
      setError("Email ou senha incorretos");
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      setError("Email ou senha incorretos");
      return;
    }

    setLoggedInUser(email);
    navigate("/dashboard");
  };

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
          Login
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Voltar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
