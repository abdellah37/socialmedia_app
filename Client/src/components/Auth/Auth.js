import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from "./Input";
import { Alert } from '@mui/material';
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup, signin } from "../../actions/auth";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [wpassword,setWpassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    password: "",
    confirmedpass: "",
  });

  const { wrongpassword } = useSelector((state) => state.auth);
  const { differntPass } = useSelector((state) => state.auth);
  
 


  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    dispatch({ type: "RESET"});
    dispatch({ type: "RESETUP"});
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log(" authontifaction failed try again ");
  };

  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignup ? "Sign Up" : "Sign In"}{" "}
        </Typography>
         { wrongpassword && (
           <>
     <Alert severity="error"> Wrong Password </Alert>

           </>
         ) }

      { differntPass && (
           <>
     <Alert severity="error"> Password mismatched </Alert>

           </>
         ) }

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
              
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}

            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              autoFocus
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
              autoFocus
              type={showPassword ? "text" : "password"}
            />
            {isSignup && (
              <>
                <Input
                  name="confirmedpass"
                  label="repeat Password"
                  handleShowPassword={handleShowPassword}
                  handleChange={handleChange}
                  autoFocus
                  type={showPassword ? "text" : "password"}
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
          >
            {isSignup ? "Sign up " : "Sign in "}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
            onClick={switchMode}
          >
            {isSignup
              ? "already have an acount sign in "
              : "you dont have any acount creat your own"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
