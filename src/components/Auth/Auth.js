import React, { useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import LockOutlinedIcon  from "@material-ui/icons/LockOutlined";
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth';
import { Alert } from '@material-ui/lab';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((previousPassword) => !previousPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});    
  };
  
  const switchMode = () => {
    setIsSignup((previousIsSigup) => !previousIsSigup);
    setShowPassword(false);
  };
  
  const googleSuccess = async (res) => {
    // console.log(res); 
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({type: 'AUTH', data: {result, token }});
      navigate('/');
    } 
    catch (error) {
      console.log(error);
    }
    
  };
  
  const googleError = () => {
    console.log('Google signin unsuccessful. Try again later');    
  };

  return (
      <>
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar} elevation={3}>
                  <LockOutlinedIcon/>
              </Avatar>
              <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {isSignup && (
                        <>
                          <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                          <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'} 
                  </Button>
                  <GoogleLogin 
                      clientId="35182198376-pueh837s4qb4ilgns5lgisj03ktsfts1.apps.googleusercontent.com"
                      render={(renderProps) => (
                          <Button 
                              className={classes.googleButton} 
                              color="primary" 
                              fullWidth 
                              onClick={renderProps.onClick} 
                              disabled={renderProps.disabled} 
                              startIcon={<Icon/>} 
                              variant='contained'>
                            Google Sign In
                          </Button>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleError }
                      cookiePolicy="single_host_origin"
                  />
                  <Grid container justify='flex-end'>
                      <Grid item>
                          <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>
                  </Grid>
              </form>
            </Paper>
        </Container>
      </>
  )
};

export default Auth;
