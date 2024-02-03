import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, TextField, Button, Container, Typography, Box } from "@mui/material";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, errors: signUpErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signUp(data);
    navigate("/products");
  });

  return (
    <Container sx={{ height: "calc(100vh - 10rem)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ p: 4, maxWidth: 400 }}>
        {signUpErrors &&
          signUpErrors.map((error, i) => (
            <Box key={i} sx={{ bgcolor: "error.main", color: "error.contrastText", p: 2, mb: 2, borderRadius: 1 }}>
              {error}
            </Box>
          ))}
        <Typography variant="h4" align="center" sx={{ mb: 2, color: "success.main" }}>
          Sign Up
        </Typography>
        <form onSubmit={onSubmit}>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register("name", { required: true })}
              fullWidth
            />
            {errors.name && <p className="text-red-500">This field is required</p>}
          </Box>

          <Box sx={{ mb: 2 }}>
            <label htmlFor="email">Email</label>
            <TextField
              id="email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              {...register("email", { required: true })}
              fullWidth
            />
            {errors.email && <p className="text-red-500">This field is required</p>}
          </Box>

          <Box sx={{ mb: 2 }}>
            <label htmlFor="password">Password</label>
            <TextField
              id="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              fullWidth
            />
            {errors.password && <p className="text-red-500">This field is required</p>}
          </Box>

          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Sign Up
          </Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography>Ya tienes cuenta ?</Typography>
          <Link to="/signin">Inicia Sesion</Link>
        </Box>
      </Card>
    </Container>
  );
}

export default SignUp;
