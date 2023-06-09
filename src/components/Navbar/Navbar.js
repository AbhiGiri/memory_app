import React, { useState } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyle from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyle();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    setUser(null);
    navigate('/');
  }

  useEffect(() => {
    const token = user?.token;
    //JWT
    if(token) {
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));  
  }, [location]);
  

  return (
    <> 
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Link to="/" className={classes.brandContainer}>
          {/* <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography> */}
          <img src={memoriesText} alt="icon" height="45px" />
          <img className={classes.image} src={memoriesLogo} alt="memories" height="40" />
        </Link>
        <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
        </Toolbar>
      </AppBar>
    </>
  )
};

export default Navbar;

