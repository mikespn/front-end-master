import React, {useState} from "react";
import InputField from '/src/components/InputField.jsx';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import {API_LOGIN} from '/src/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginData, setLoginData] = useState({
        loginUsername: "",
        loginPassword: ""
    });

    const navigate = useNavigate();

    const updateLoginForm = (e) => {
        setLoginData((state) => ({...state, [e.target.id] : e.target.value}));
    };

    const submitLogin =  async (e) => {
        e.preventDefault();
        
        const transformedData = {
            username: loginData.loginUsername, 
            password: loginData.loginPassword
        };

        try{
            const response = await axios.post(API_LOGIN, transformedData);
            
            if(response.status === 200){

                const { token, id, authorities} = response.data;
                
                //console.log('Token:', token, 'ID:', id, 'Authorities:', authorities);

                localStorage.setItem('token', token);
                localStorage.setItem('userId', id);

                const hasAdminRole = authorities.some(auth => auth.authority === 'ROLE_ADMIN');
                
                if(hasAdminRole){
                    navigate('/admin');
                }else{
                    navigate('/owner');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
        <Box 
          component="form" 
          onSubmit={submitLogin}  
          sx={{ 
            mt: 10, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
          }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="loginUsername"
            label="Username"
            name="loginUsername"
            autoComplete="username"
            autoFocus
            value={loginData.loginUsername}
            onChange={updateLoginForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="loginPassword"
            label="Password"
            type="password"
            id="loginPassword"
            autoComplete="current-password"
            value={loginData.loginPassword}
            onChange={updateLoginForm}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            //disabled={isLoading}
          > Login
          </Button>
        </Box>
    </Container>
    );
}

export default Login;