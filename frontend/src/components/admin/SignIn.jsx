import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, Button, TextField, Container, Typography, Box } from "@mui/material";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signInErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signIn(data);
    if (user) {
      navigate("/admin");
    }
  });

  return (
    <Container sx={{ height: "calc(100vh - 10rem)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ p: 4, maxWidth: 400 }}>
        {signInErrors &&
          signInErrors.map((error, index) => (
            <Box key={index} sx={{ bgcolor: "error.main", color: "error.contrastText", p: 2, mb: 2, borderRadius: 1 }}>
              {error}
            </Box>
          ))}
        <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
          Iniciar Sesión
        </Typography>

        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="email">Email</label>
            {errors.email && <p className="text-red-500">El email es un campo requerido.</p>}
            <TextField
              id="email"
              type="email"
              placeholder="Tu email"
              autoComplete="email"
              {...register("email", { required: true })}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <label htmlFor="password">Contraseña</label>
            {errors.password && <p className="text-red-500">La contraseña es un campo requerido.</p>}
            <TextField
              id="password"
              type="password"
              placeholder="Tu contraseña"
              autoComplete="current-password"
              {...register("password", { required: true })}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="secondary" sx={{ width: 200, mt: 2 }}>
              Iniciar Sesión
            </Button>
          </Box>
        </form>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography>Eres nuevo ?</Typography>
          <Link to="/signup">Registrate</Link>
        </Box>
      </Card>
    </Container>
  );
}

export default SignIn;
