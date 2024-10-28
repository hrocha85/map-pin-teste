import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUser } from "../../utils/localStorage";
import bcrypt from "bcryptjs";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const existingUser = getUser(email);
    if (existingUser) {
      setError("Email já cadastrado");
      return;
    }

    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);
    saveUser(email, hashedPassword);
    navigate("/sign-in");
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
          Cadastrar-se
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
            label="Crie uma senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confime sua senha"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
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

export default SignUp;
