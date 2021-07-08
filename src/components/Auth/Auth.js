import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Icon from './icon'
import useStyles from './styles'
import Input from './input'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: "",lastName:"",email:"", password: "",confirmPassword: ""}

const Auth = () => {
    const classes = useStyles();  
    //declaring as a state because need to show rhe password with click
    const [showPassword, setShowPassowrd] = useState(false)

    //toggling
    const handleShowPassword = () => setShowPassowrd((prevShowPassword) => !prevShowPassword)

    const [isSignUp,setIsSignup] = useState(false)
    const [formData, setFormData ] = useState(initialState)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
       
        if(isSignUp) {
            dispatch(signup(formData, history))
        }else {
            dispatch(signin(formData, history))
        }

    }

    const handleChange = (e) => {
        //which input value will will change only that will affect 
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp)
        setShowPassowrd(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId;
        

        try {
            dispatch({ type: 'AUTH', data: {result, token }})
            history.push('/')
        } catch (error) {
            console.log(error)    
        }
        
    }

    const googleFailure = (error) => {
        console.log(error)
        alert('Google Sign In was unsuccesfull. Try again letter')
    }

    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "একাউন্ট খুলুন" : "প্রবেশ করুন"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                //only if it is signUp then show something
                isSignUp && (
                  <>
                    <Input
                      name="firstName"
                      label="প্রথম নাম"
                      handleChange={handleChange}
                      autoFocus
                      half
                    />
                    <Input
                      name="lastName"
                      label="শেষ নাম"
                      handleChange={handleChange}
                      half
                    />
                  </>
                )
              }
              <Input
                name="email"
                label="ইমেইল"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="পাসওয়ার্ড"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />

              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="কনফার্ম পাসওয়ার্ড"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "একাউন্ট খুলুন" : "প্রবেশ করুন"}
            </Button>
            <GoogleLogin
              clientId="268305242439-8jhgmconc9clu0b39a1ejhnl4gg0ovnc.apps.googleusercontent.com"
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
                  গুগল দিয়ে প্রবেশ করুন
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />

            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "একাউন্ট আছে? প্রবেশ করুন"
                    : "একাউন্ট নেই? একাউন্ট খুলুন"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
}


export default Auth