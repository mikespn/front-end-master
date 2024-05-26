import axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
  const [joke, setJoke] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((data) => {
        setJoke(data.data.value);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <div>
    //   <h1>Admin page</h1>
    //   <div>{isLoading ? <h3>Loading...</h3> : <h3>{joke}</h3>}</div>
    // </div>
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
};

export default Admin;
