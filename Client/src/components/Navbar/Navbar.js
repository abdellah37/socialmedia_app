import React , {useState ,useEffect}from 'react'
import { Link } from 'react-router-dom';
import {   AppBar , Avatar, Toolbar, Typography ,Button , Grid } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../Images/memoriesLogo.png';
import memoriestext from '../../Images/memoriesText.png';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory , useLocation } from 'react-router-dom';


const  Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [user , setUser ] =useState(JSON.parse(localStorage.getItem('profile'))); 
    console.log("user");
    console.log(user);
    console.log("user");


    useEffect( () => {
         const token = user?.token;

         if(token) {
             const decodedToken = decode(token);
             if(decodedToken.exp * 1000 < new Date().getTime()) logout();
         }
         setUser(JSON.parse(localStorage.getItem('profile')));

} , [location]);

    const logout = () => {
        setUser(null);
        localStorage.clear();
        dispatch({ type : "LOGOUT"});
        history.push('/posts');
    }


    
    const classes = useStyles();   
    return (
        
            <AppBar  className={classes.appBar} position="static"    color="inherit" >

                <Link to="/" classNmae={classes.brandContainer}>
                   <img   src={memoriestext} alt="icon text" height="45" />
                   <img  className={classes.image} src={memoriesLogo}    alt="icon"    height="45" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    { user ? (
                        <div classeName={classes.profile}>
                            
                        <Grid container spacing={2} direction="row" > 
                        <Grid item xs={4}>
                               <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl} > {user?.result?.name.charAt(0)}</Avatar> 
                        </Grid>
                        <Grid item xs={4}>

                              <Typography className={classes.userName} varaintt="h6"  > {user?.result?.name}</Typography> 
                        </Grid>  
                        <Grid item xs={4}>     
                               <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}  >  LOGOUT  </Button>  
                        </Grid>
                        </Grid>
                        </div>

                    ) : (

                        
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                      
                    )}

                    
                   
                </Toolbar>
            </AppBar>
    
    )
}

export default Navbar
