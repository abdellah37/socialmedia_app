import React, {useState,useEffect} from 'react'
import useStyles from './styles'
import { Avatar , Button , Grid , Typography , Container , Paper  } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input';
import { GoogleLogin } from 'react-google-login' 
import Icon from './Icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';




const  Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword]=useState(false);
    const [isSignup,setIsSignup]=useState(false);
    const history = useHistory();
    const [authData,setAuthData]= useState({ firstname:'' , lastname:'' , email:'', password:'',   confirmpassword: '',});
     
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) =>  !prevShowPassword);
    }


    const switchMode = () => {
        setIsSignup((prevIsSignup) =>  !prevIsSignup);
        setShowPassword(false);
    }

    

    const handleChange = () => {

    }


    const handleSubmit = () => {

    }
     const googleSuccess =  async (res) => {
         console.log(res);
         const result = res?.profileObj;
         const token = res?.tokenId;
         try {
           dispatch({ type : "AUTH" , data : { result , token } })
           history.push('/');
         } catch (error) {
            console.log(error)
         }

     }
     const googleFailure = (error) => {
        console.log(error);
         console.log(' authontifaction failed try again ')

     }

    return (
        <Container>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                      <LockOutlinedIcon />
                </Avatar>
            <Typography variant="h5" > {isSignup ? 'Sign Up' : 'Sign In' }   </Typography>
            <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container spacing={2}> 
             {  isSignup && ( 
                 <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                </>  
             ) }

             <Input name="email" label="Email" handleChange={handleChange} autoFocus type="email" />
             <Input name="password" label="Password"  handleShowPassword={handleShowPassword} handleChange={handleChange} autoFocus type={showPassword ? 'text': 'password'}  />
             {
               isSignup && ( 
                <>
           <Input name="password" label="repeat Password"  handleShowPassword={handleShowPassword} handleChange={handleChange} autoFocus type={showPassword ? 'text': 'password'} />
          
               </>  
            )  
             }
             
            
            </Grid> 
             <Button type="submit"  variant="contained"  color="primary" className={classes.submit} fullWidth >
                 { isSignup ? 'Sign up ' : 'Sign in '}
             </Button>
             <GoogleLogin
            clientId="1066323431619-qt2ja5ff4uj82cun1mgfbpks3a5mbm27.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
             <Button variant="contained"  color="primary" className={classes.submit} fullWidth onClick={switchMode} > 

             {isSignup ? 'already have an acount sign in ' : 'you dont have any acount creat your own' }
             </Button>


            </ form>

            </Paper>
        </Container>
       
    )
}

export default Auth
