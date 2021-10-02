import React , {useState ,useEffect}from 'react'
import { Link } from 'react-router-dom';
import {   AppBar , Avatar, Toolbar, Typography ,Button  } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../Images/travel.jpg';
import { useDispatch } from 'react-redux';
import { useHistory , useLocation } from 'react-router-dom';


const  Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [user , setUser ] =useState(JSON.parse(localStorage.getItem('profile'))); 
    console.log(user);

    useEffect( () => {
         const token = user?.token;
         setUser(JSON.parse(localStorage.getItem('profile')))

} , [location]);

    const logout = () => {
        setUser(null);
        dispatch({ type : "LOGOUT"});
        history.pushState('/');
    }


    
    const classes = useStyles();   
    return (
        
            <AppBar  className={classes.appBar} position="static"    color="inherit" >

                <div classNmae={classes.brandContainer}>
                   <Typography component={Link} to="/" className={classes.heading} variant="h2"  align="center" > MEMORIES </Typography>
                   <img  className={classes.image} src={memories}    alt="icon"    height="60" />
                </div>
                <Toolbar classeName={classes.toolbar}>
                    { user ? (
                        <div classeName={classes.profile}>
                               <Avatar classeName={classes.purple} alt={user.result.name} src={user.result.imageUrl} > {user.result.name.charAt(0)}</Avatar>
                               <Typography classeName={classes.userName} varaintt="h6"  > {user.result.name}</Typography>
                               <Button classeName={classes.logout} variant="contained" color="secondary" onClick={logout}  >  LOGOUT  </Button>

                        </div>

                    ) : (
                      <Button  variant="contained" component={Link} to="AUTH" > Sign In    </Button>
                    )}

                    
                   
                </Toolbar>
            </AppBar>
    
    )
}

export default Navbar
