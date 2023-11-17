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
  OutlinedInput,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";

//import styles from "./SignUp.module.css";
import { api } from "@/api/axios";
import { UserSchemaSignUp, UserSignUpType } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const steps = ["Set up your account", "Personal info", "Other details"];

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpType>({
    resolver: zodResolver(UserSchemaSignUp),
  });

  const handleSignUp = async (data: UserSignUpType) => {
    try {
      const formData = new FormData();
      
      formData.append("photo", data.photo[0]);

      api.post("/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        const fileName = response.data;
  
        data.photo = fileName;
        delete data.confirmPassword;
  
        api.post("/auth/signup", data);
        
      }).catch(err => console.log(err))


      navigate("/signin");
    } catch (error) {
      return error.message;
    }
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
        width: "40rem",
        height: "40rem",
        borderRadius: 3,
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        p: 3,
      }}
      gap={3}
    >
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
          Signup
        </Typography>

        <Box sx={{ width: "100%", mt: 3 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>
                    <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>
      <Divider variant="middle" />

      <Box>
        <>
          {activeStep === 0 && (
            <Box mb={12}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-text">Email</InputLabel>
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
                  <strong style={{ color: "#dd0000" }}>
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
                  <strong style={{ color: "#dd0000" }}>
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
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
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
                  label="Confirm Password"
                  sx={{ bgcolor: "#E8F0FE" }}
                />
                {errors.confirmPassword && (
                  <strong style={{ color: "#dd0000" }}>
                    {errors.confirmPassword.message}
                  </strong>
                )}
              </FormControl>
            </Box>
          )}
          {activeStep === 1 && (
            <Box mb={12}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-text">Name</InputLabel>
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
                  <strong style={{ color: "#dd0000" }}>
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
                >
                  <MenuItem value={"Woman"}>Woman</MenuItem>
                  <MenuItem value={"Men"}>Men</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
                {errors.gender && (
                  <strong style={{ color: "#dd0000" }}>
                    {errors.gender.message}
                  </strong>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-text">
                  Blood Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("bloodType", {
                    required: "Blood type is required",
                  })}
                  label="Blood type"
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
                  <strong style={{ color: "#dd0000" }}>
                    {errors.bloodType.message}
                  </strong>
                )}
              </FormControl>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
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
                  <strong style={{ color: "#dd0000" }}>
                    {errors.photo.message}
                  </strong>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-text">Phone</InputLabel>
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
                  <strong style={{ color: "#dd0000" }}>
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
                  <strong style={{ color: "#dd0000" }}>
                    {errors.dateOfBirth.message}
                  </strong>
                )}
              </FormControl>
              <FormGroup>
                <FormControl sx={{ m: 1, width: "100%" }}>
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
                    <strong style={{ color: "#dd0000" }}>
                      {errors.termsOfUseAccepted.message}
                    </strong>
                  )}
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }}>
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
                    <strong style={{ color: "#dd0000" }}>
                      {errors.privacyPolicy.message}
                    </strong>
                  )}
                </FormControl>
              </FormGroup>
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit(handleSignUp)}>Cadastrar</Button>
            ) : (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </>
      </Box>
    </Box>
  );
};

export default SignUp;
