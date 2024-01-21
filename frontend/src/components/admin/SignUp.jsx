import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, Input, Button, Label, Container } from "../ui/Index";

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
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {signUpErrors &&
          signUpErrors.map((error, i) => (
            <p key={i} className="bg-red-500 text-center p-2">
              {error}
            </p>
          ))}
        <h3 className="text-4xl font-bold text-green-600 my-2">Sign Up</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Your name"
            autoComplete="name"
            {...register("name", { required: true })}
          />

          {errors.name && (
            <p className="text-red-500">This field is required</p>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Your email"
            autoComplete="email"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <p className="text-red-500">This field is required</p>
          )}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />

          {errors.password && (
            <p className="text-red-500">This field is required</p>
          )}

          <Button type="submit">Sign Up</Button>
        </form>

        <div className="flex justify-between my-4">
          <p>Already have an account ?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </Card>
    </Container>
  );
}

export default SignUp;
