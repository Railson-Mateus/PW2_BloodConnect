import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  MobileStepper,
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneIcon from "@mui/icons-material/Phone";

//import styles from "./SignUp.module.css";
import { api } from "@/api/axios";
import { UserSchemaSignUp, UserSignUpType } from "@/models/User";

const steps = [
  {
    id: 'Step 1',
    name: 'Set up your account',
    fields: ["email", "password", "confirmPassword"]
  },
  {
    id: 'Step 2',
    name: 'Personal info',
    fields: ["name", "gender", "bloodType"]
  },
  { id: 'Step 3', name: 'Other details', fields: ["photo",
        "phone",
        "dateOfBirth",
        "termsOfUseAccepted",
        "privacyPolicy"] }
]

const SignUp = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<UserSignUpType>({
    resolver: zodResolver(UserSchemaSignUp),
  });

  type FildName = keyof UserSignUpType

  const handleNavigateLogin = () => {
    navigate("/signin");
  };

  const handleSignUp = async (data: UserSignUpType) => {
    const fields = steps[activeStep].fields  
    const output = await trigger(fields as FildName[], { shouldFocus: true })
    console.log(output, activeStep);
    
    if (!output) return

    try {
      const formData = new FormData();

      formData.append("photo", data.photo[0]);

      const response = await api.post("/file", formData);
      const fileName = response.data;
      data.photo = fileName;
      delete data.confirmPassword;
      await api.post("/auth/signup", data);

      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const fields = steps[activeStep].fields  
    const output = await trigger(fields as FildName[], { shouldFocus: true })
    
    if (!output) return

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? "20rem" : "38rem",
        height: isSmallScreen ? "34rem" : "38rem",
        minWidth: "20rem",
        minHeight: "34rem",
        borderRadius: 3,
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        p: 3,
      }}
      gap={3}
    >
      {isSmallScreen ? (
        <>
          <Box
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
              Criar uma Conta
            </Typography>

            {activeStep === 0 && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type={"text"}
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    }
                    label="Email"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.email && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.email.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
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
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.password.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.confirmPassword && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.confirmPassword.message}
                    </strong>
                  )}
                </FormControl>
              </Box>
            )}
            {activeStep === 1 && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type={"text"}
                    {...register("name", {
                      required: "Name Address is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    }
                    label="Name"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.name && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.name.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    label="Gender"
                    defaultValue=""
                  >
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </Select>
                  {errors.gender && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.gender.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Tipo sanguineo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("bloodType", {
                      required: "Blood type is required",
                    })}
                    label="Blood type"
                    defaultValue=""
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                  {errors.bloodType && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.bloodType.message}
                    </strong>
                  )}
                </FormControl>
              </Box>
            )}
            {activeStep === 2 && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-photo"
                    type={"file"}
                    {...register("photo", {
                      required: "Photo is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <AddPhotoAlternateIcon />
                      </InputAdornment>
                    }
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.photo && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.photo.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Telefone
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    type={"number"}
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    }
                    label="phone"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.phone && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.phone.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-dateOfBirth"
                    type={"Date"}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.dateOfBirth && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.dateOfBirth.message}
                    </strong>
                  )}
                </FormControl>
                <FormGroup sx={{ alignSelf: "start" }}>
                  <FormControl>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          {...register("termsOfUseAccepted", {
                            required: "terms of use accepted is required",
                          })}
                        />
                      }
                      label="Terms of use"
                    />
                    {errors.termsOfUseAccepted && (
                      <strong style={{ color: "#dd0000", marginTop: 5 }}>
                        {errors.termsOfUseAccepted.message}
                      </strong>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          {...register("privacyPolicy", {
                            required: "Privacy policy is required",
                          })}
                        />
                      }
                      label="Privacy policy"
                    />
                    {errors.privacyPolicy && (
                      <strong style={{ color: "#dd0000", marginTop: 5 }}>
                        {errors.privacyPolicy.message}
                      </strong>
                    )}
                  </FormControl>
                </FormGroup>
              </Box>
            )}
            <Box sx={{ width: "100%" }}>
              <MobileStepper
                steps={steps.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                  activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit(handleSignUp)}>
                      Cadastrar
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  )
                }
                backButton={
                  activeStep === 0 ? (
                    <Button
                      color="inherit"
                      onClick={handleNavigateLogin}
                      sx={{ mr: 1 }}
                    >
                      Login
                    </Button>
                  ) : (
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                  )
                }
              />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography sx={{ fontSize: "2.5rem", fontWeight: 600 }}>
              Criar uma Conta
            </Typography>

            <Box sx={{ width: "100%", mt: 3 }}>
              <Stepper activeStep={activeStep}>
                {steps.map((step) => {
                  return (
                    <Step key={step.name}>
                      <StepLabel>
                        <Typography sx={{ fontWeight: 600 }}>
                          {step.name}
                        </Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Box sx={{flex: 1, display: "flex",flexDirection: "column", justifyContent: "space-between"}}>
            {activeStep === 0 && (
              <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type={"text"}
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    }
                    label="Email"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.email && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.email.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
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
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.password.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.confirmPassword && (
                    <strong style={{ color: "#dd0000", marginTop: 5}}>
                      {errors.confirmPassword.message}
                    </strong>
                  )}
                </FormControl>
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type={"text"}
                    {...register("name", {
                      required: "Name Address is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <PersonOutlineOutlinedIcon />
                      </InputAdornment>
                    }
                    label="Name"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.name && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.name.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    label="Gender"
                    defaultValue=""
                  >
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </Select>
                  {errors.gender && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.gender.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Tipo sanguineo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("bloodType", {
                      required: "Blood type is required",
                    })}
                    label="Blood type"
                    defaultValue=""
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                  {errors.bloodType && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.bloodType.message}
                    </strong>
                  )}
                </FormControl>
              </Box>
            )}
            {activeStep === 2 && (
              <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <FormControl fullWidth={true} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-photo"
                    type={"file"}
                    {...register("photo", {
                      required: "Photo is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <AddPhotoAlternateIcon />
                      </InputAdornment>
                    }
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-text">
                    Telefone
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-phone"
                    type={"number"}
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    }
                    label="phone"
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.phone && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.phone.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-dateOfBirth"
                    type={"Date"}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                    sx={{ bgcolor: "#E8F0FE" }}
                  />
                  {errors.dateOfBirth && (
                    <strong style={{ color: "#dd0000", marginTop: 5 }}>
                      {errors.dateOfBirth.message}
                    </strong>
                  )}
                </FormControl>
                <FormGroup>
                  <FormControl sx={{  width: "100%" }}>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          {...register("termsOfUseAccepted", {
                            required: "terms of use accepted is required",
                          })}
                        />
                      }
                      label="Terms of use"
                    />
                    {errors.termsOfUseAccepted && (
                      <strong style={{ color: "#dd0000", marginTop: 5 }}>
                        {errors.termsOfUseAccepted.message}
                      </strong>
                    )}
                  </FormControl>
                  <FormControl sx={{  width: "100%" }}>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          {...register("privacyPolicy", {
                            required: "Privacy policy is required",
                          })}
                        />
                      }
                      label="Privacy policy"
                    />
                    {errors.privacyPolicy && (
                      <strong style={{ color: "#dd0000", marginTop: 5 }}>
                        {errors.privacyPolicy.message}
                      </strong>
                    )}
                  </FormControl>
                </FormGroup>
              </Box>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep === 0 ? (
                <Button
                  color="inherit"
                  onClick={handleNavigateLogin}
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
              ) : (
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <Button onClick={handleSubmit(handleSignUp)}>Cadastrar</Button>
              ) : (
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SignUp;
