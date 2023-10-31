import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { UserSchemaSignIn, UserSignInType } from "@/models/User";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

//import styles from "./SignIn.module.css";

const ButtonCustomized = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  borderRadius: "0.25rem",
  width: "41ch",
  height: "3.5rem",
  padding: "0.625rem 1.5rem",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
  background:
    "linear-gradient(180deg, #E04735 0%, #D13C3E 28.13%, #C03346 54.69%, #BC304A 80.21%, #AD2651 100%)",
}));

const SignIn = () => {
  const [admin, setAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickAdmin = () => setAdmin((admin) => !admin);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(UserSchemaSignIn),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(data: UserSignInType) {
    const result = await login({ ...data, admin });

    if (result) {
      setErrorMessage(result);
      return;
    }

    navigate("/home");
  }

  return (
    <Box
      sx={{
        width: "24rem",
        height: "28rem",
        borderRadius: 3,
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
      }}
      gap={4}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "2rem", fontWeight: "600" }}>
          Hemocentro
        </Typography>
        <Typography sx={{ fontSize: "1.3rem" }}>Digital</Typography>
        {admin && <Typography sx={{ fontSize: ".8rem" }}>Admin</Typography>}
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-text">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type={"text"}
            {...register("email", { required: "Email Address is required" })}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlinedIcon />
              </InputAdornment>
            }
            label="Email"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.email && (
            <strong style={{ color: "#dd0000" }}>{errors.email.message}</strong>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{ bgcolor: "#E8F0FE" }}
          />
          {errors.password && (
            <strong style={{ color: "#dd0000" }}>
              {errors.password.message}
            </strong>
          )}
        </FormControl>
      </Container>
      <Container
        sx={{
          display: "flex",
          height: "0px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        {errorMessage && <p>{errorMessage}</p>}
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonCustomized onClick={handleSubmit(handleLogin)}>
          <Typography fontSize={"0.7rem"}>Entrar</Typography>
        </ButtonCustomized>
        <Button onClick={handleClickAdmin}>
          <Typography fontSize={"0.7rem"} color={"black"}>
            Logar como {admin ? "usuario" : "admin"}
          </Typography>
        </Button>
        {!admin && (
          <Button>
            <Typography fontSize={"0.7rem"} color={"black"}>
              Novo usuario
            </Typography>
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default SignIn;
